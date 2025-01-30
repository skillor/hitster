import { Injectable } from '@angular/core';
import { SpotifyPlaylist } from '../spotify-api/spotify-types';
import { HandleTimesType } from '../game-settings';
import { Observable, map, of, switchMap } from 'rxjs';
import { SpotifyApiService } from '../spotify-api/spotify-api.service';
import { NumberExtractMode, escapeString, extractTextContent, getLanguage, numberExtract, stringSimilarity, stringSimilarityCropStart } from '../utils';
import { PlaylistLink } from './playlist-link';
import { HttpClient } from '@angular/common/http';
import { WikiApiService } from '../wiki-api/wiki-api.service';
import { WikiSearchResult } from '../wiki-api/wiki-types';


const remasterTags = [
  '[0-9]{4} remastered',
  'remastered [0-9]{4}',
  'remastered',
  '[0-9]{4} remaster',
  'remaster [0-9]{4}',
  'remaster',
  'rerecorded',
  'mono',
  'stereo',
  'studio recording',
];

const miscTags = [
  '[0-9]{4} version',
  'version [0-9]{4}',
  'single version',
  'video version',
  'from .*',
  'the original',
  'spanglish version',
  'version revisited'
];

const changeTags = [
  'remix',
  'mix',
  'radio',
  'instrumental',
  // 'live',
  'interlude',
  'acoustic',
  'edit',
  'alternate',
];

const specialTags = [
  ...remasterTags,
  ...changeTags,
  ...miscTags,
];

function getTagRegExp(tags: string[]): RegExp {
  return new RegExp(tags.map(v => `\\b${v}\\b`).join('|'), 'ig');
}

function removeTags(s: string, tags: string[]): string {
  return s.replace(getTagRegExp(tags), '').replace(/\s+/g, ' ');
}

function getFilteredTags(s: string, tags: string[]): string[] {
  return ((s || '').match(getTagRegExp(tags)) || []);
}

const CURR_YEAR = String(new Date().getFullYear() + 1);
const WIKI_YEAR_REGEX = new RegExp(`\\b(?:1[4-9][0-9][0-9])\\b|\\b(?:[2-${CURR_YEAR[0]}][0-${CURR_YEAR[1]}][0-${CURR_YEAR[2]}][0-${CURR_YEAR[3]}])\\b`, 'ig');

function extractWikiYear(
  pages: WikiSearchResult[],
  artist: string | undefined,
  numberExtractMode: NumberExtractMode = 'first',
  skipArtistMode : NumberExtractMode | null = 'high'
): {page: WikiSearchResult, year: number} | undefined {
  for (let p of pages) {
    if (!p) continue;
    if (artist && p.title && (p.title == artist || stringSimilarity(p.title, artist) > 0.55)) continue;
    let t = p.description?.match(WIKI_YEAR_REGEX);
    if (!t) t = extractTextContent(p.excerpt).match(WIKI_YEAR_REGEX);
    if(!t) t = extractTextContent(p.html, 'figure, figure ~ * small').match(WIKI_YEAR_REGEX);
    if (t) return {page: p, year: numberExtract(t.map(v => +v), numberExtractMode)};
  }
  if (!skipArtistMode) return undefined;
  return extractWikiYear(pages, undefined, skipArtistMode, null);
}


@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient,
    private spotifyApi: SpotifyApiService,
    private wikiApi: WikiApiService,
  ) { }

  get(playlistLink: PlaylistLink): Observable<SpotifyPlaylist | undefined> {
    if (playlistLink.type == 'spotify-playlist') return this.spotifyApi.playlist(playlistLink.payload);
    if (playlistLink.type == 'json') return this.http.get<SpotifyPlaylist>(playlistLink.payload);
    return of(undefined);
  }

  handleTimes(playlist: SpotifyPlaylist, handleTimesType: HandleTimesType): Observable<SpotifyPlaylist> {
    if (handleTimesType == 'fix-all') return this.handleTimes(playlist, 'fix-all-spotify').pipe(switchMap(p => {
      p.items.forEach(i => i.track.fixed_release_time = undefined);
      return this.handleTimes(p, 'fix-all-wiki');
    }));

    if (handleTimesType == 'remove-tags' ||
        handleTimesType == 'fix-tags' ||
        handleTimesType == 'fix-all-wiki' ||
        handleTimesType == 'fix-all-spotify') {

      const toHandle = playlist.items.filter(v => {
        if (v.track.fixed_release_time) return false;
        if (handleTimesType == 'fix-all-spotify' || handleTimesType == 'fix-all-wiki') return true;
        return getFilteredTags(v.track.name, remasterTags).length > 0;
      });

      if (toHandle.length == 0) return of(playlist);

      if (handleTimesType == 'remove-tags') {
        console.log('tags removed:', toHandle.map(t => `${t.track.name} - ${t.track.artists[0].name} | ${t.track.album.release_date}`));

        playlist.items = playlist.items.filter(v => !toHandle.some(c => c.track.id == v.track.id));

        playlist.total = playlist.items.length;
        return of(playlist);
      }

      if (handleTimesType == 'fix-all-wiki') {
        return this.wikiApi.searchAllAlternatives(toHandle.map(item => {
          const titleCut = escapeString(removeTags(item.track.name.replace(/ *\([^)]*\) */g, '').replace(/ *\[[^\]]*\] */g, ''), specialTags));
          const check = (p: WikiSearchResult[]) => extractWikiYear(p, item.track.artists[0].name, 'first', null);
          const lang = getLanguage();
          const r = [];
          r.push({search: `${titleCut} ${item.track.artists[0].name}`, language: lang, check });
          if (lang != 'en') r.push({search: `${titleCut} ${item.track.artists[0].name}`, language: 'en', check });
          r.push({search: `${titleCut}`, language: lang, check });
          if (lang != 'en') r.push({search: `${titleCut}`, language: 'en', check });
          return r;
        }), 100, 2).pipe(
          map(results => {
            // console.log(toHandle);
            // console.log(results);
            const fixed: string[] = [];
            for (let i=0; i<results.length; i++) {
              const original = toHandle[i];
              original.track.fixed_release_time = true;
              const found = extractWikiYear(results[i], original.track.artists[0].name);
              if (!found) {
                console.log('not found', original.track.name, original.track.artists[0].name);
                continue;
              }
              if (found.year && found.year < new Date(original.track.album.release_date).getFullYear()) {
                fixed.push(`${original.track.name} - ${original.track.artists[0].name} | ${original.track.album.release_date} => ${found.year} | ${found.page.title}`);
                original.track.album.release_date = String(found.year);
                original.track.album.release_date_precision = 'year';
              } else {
                console.log('not fixed', original.track.name, original.track.artists[0].name, 'found:', found.year, 'had:', new Date(original.track.album.release_date).getFullYear());
              }
            }

            console.log('tags fixed:', fixed);

            return playlist;
          })
        )
      }

      return this.spotifyApi.searchAll(toHandle.map(item => {
        return `${item.track.name} - ${item.track.artists.map(v => v.name).join(', ')}`
      }), 100, 20).pipe(
        map(results => {
          // console.log(toHandle);
          // console.log(results);
          const fixed: string[] = [];
          for (let i=0; i<results.length; i++) {
            const original = toHandle[i];
            const title = original.track.name;
            const titleNoTags = removeTags(title, specialTags);
            const titleChangeTags = getFilteredTags(title, changeTags);
            const found = results[i].items
            .filter((t) =>
              t.artists[0].name == original.track.artists[0].name
              && getFilteredTags(t.name, changeTags).length <= titleChangeTags.length
              && stringSimilarityCropStart(titleNoTags, removeTags(t.name, specialTags)) > 0.7
              // && console.log(titleNoTags, removeTags(t.name, specialTags))
            )
            .sort((t1, t2) => new Date(t1.album.release_date) < new Date(t2.album.release_date) ? -1 : 1)
            // .sort((t1, t2) => stringSimilarity(title, t1.name) > stringSimilarity(title, t2.name) ? -1 : 1 )
            [0];
            if (!found) console.log('not found', title, original.track.artists[0].name, results[i].items);
            if (found && new Date(found.album.release_date) < new Date(original.track.album.release_date)) {
              fixed.push(`${original.track.name} - ${original.track.artists[0].name} | ${original.track.album.release_date} => ${found.album.release_date} | ${found.name} - ${found.artists[0].name}`);
              original.track = found;
            }
            original.track.fixed_release_time = true;
          }

          console.log('tags fixed:', fixed);

          return playlist;
        })
      );
    }

    return of(playlist);
  }
}
