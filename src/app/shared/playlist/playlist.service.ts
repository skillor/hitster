import { Injectable } from '@angular/core';
import { SpotifyPlaylist } from '../spotify-api/spotify-playlist';
import { GameSettings } from '../game-settings';
import { Observable, combineLatest, map, of } from 'rxjs';
import { SpotifyApiService } from '../spotify-api/spotify-api.service';
import { stringSimilarityCropStart } from '../utils';
import { PlaylistLink } from './playlist-link';
import { HttpClient } from '@angular/common/http';

const remasterTags = [
  'remaster',
  'remastered',
  'rerecorded',
];

const changeTags = [
  'mono',
  'stereo',
  'mix',
  'remix',
  'radio',
  'instrumental',
  'live',
  'interlude',
  'acoustic',
  'edit',
  'alternate',
];

const specialTags = [
  ...remasterTags,
  ...changeTags,
];

function getTagRegExp(tags: string[]): RegExp {
  return new RegExp('[^\\s\\.]' + tags.join('|') + '[^\\s\\.]', 'ig');
}

function removeTags(s: string, tags: string[]): string {
  return s.replace(getTagRegExp(tags), '').replace(/\s+/g, ' ');
}

function getFilteredTags(s: string, tags: string[]): string[] {
  return ((s || '').match(getTagRegExp(tags)) || []);
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient,
    private spotifyApi: SpotifyApiService,
  ) { }

  get(playlistLink: PlaylistLink): Observable<SpotifyPlaylist | undefined> {
    if (playlistLink.type == 'spotify-playlist') return this.spotifyApi.playlist(playlistLink.payload);
    if (playlistLink.type == 'json') return this.http.get<SpotifyPlaylist>(playlistLink.payload);
    return of(undefined);
  }

  handleTimes(playlist: SpotifyPlaylist, gameSettings: GameSettings): Observable<SpotifyPlaylist> {

    if (gameSettings.handleTimes == 'remove-tags' ||
        gameSettings.handleTimes == 'fix-tags' ||
        gameSettings.handleTimes == 'fix-all') {

      const toHandle = playlist.items.filter(v => {
        if (v.track.fixed_release_time) return false;
        if (gameSettings.handleTimes == 'fix-all') return true;
        return getFilteredTags(v.track.name, remasterTags).length > 0;
      });

      if (toHandle.length == 0) return of(playlist);

      if (gameSettings.handleTimes == 'remove-tags') {
        console.log('tags removed:', toHandle.map(t => `${t.track.name} - ${t.track.artists[0].name} | ${t.track.album.release_date}`));

        playlist.items = playlist.items.filter(v => !toHandle.some(c => c.track.id == v.track.id));

        playlist.total = playlist.items.length;
        return of(playlist);
      }

      return this.spotifyApi.searchAll(toHandle.map(item => {
        return `${item.track.name} - ${item.track.artists.map(v => v.name).join(', ')}`
      }), 100, 20).pipe(
        map(results => {
          console.log(toHandle);
          console.log(results);
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
            // if (!found) console.log(title, results[i].items);
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
