import { Injectable } from '@angular/core';
import { SpotifyPlaylist } from '../spotify-api/spotify-playlist';
import { GameSettings } from '../game-settings';
import { Observable, combineLatest, map, of } from 'rxjs';
import { SpotifyApiService } from '../spotify-api/spotify-api.service';
import { stringSimilarity } from '../utils';

function getFilteredTags(s: string, tags: string[]): string[] {
  const split = s.toLowerCase().replace(/[^\w ]/g,'').split(' ');
  return tags.filter(v => split.includes(v))
}

function getSpecialTags(name: string): string[] {
  return getFilteredTags(name, [
    'mix',
    'remix',
    'edit',
    'remaster',
    'remastered',
    'instrumental',
    'live',
    'rerecorded',
    'interlude',
    'acoustic',
    'version',
  ]);
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private spotifyApi: SpotifyApiService,
  ) { }

  handleTimes(playlist: SpotifyPlaylist, gameSettings: GameSettings): Observable<SpotifyPlaylist> {

    if (gameSettings.handleTimes == 'remove-tags' ||
        gameSettings.handleTimes == 'fix-tags' ||
        gameSettings.handleTimes == 'fix-all') {

      const toHandle = playlist.items.filter(v => {
        if (v.track.fixed_release_time) return false;
        if (gameSettings.handleTimes == 'fix-all') return true;
        return getFilteredTags(v.track.name, ['remaster', 'remastered', 'rerecorded']).length > 0;
      });

      if (toHandle.length == 0) return of(playlist);

      if (gameSettings.handleTimes == 'remove-tags') {
        console.log('tags removed:', toHandle.map(t => `${t.track.name} - ${t.track.artists[0].name} | ${t.track.album.release_date}`));

        playlist.items = playlist.items.filter(v => !toHandle.some(c => c.track.id == v.track.id));

        playlist.total = playlist.items.length;
        return of(playlist);
      }

      return combineLatest(toHandle.map(item => {
        let title = item.track.name;
        return this.spotifyApi.searchTrack(`${title} - ${item.track.artists.map(v => v.name).join(', ')}`, 20).pipe(
          map(v => ({original: item, new: v.items
            .filter((t) =>
              t.artists[0].name == item.track.artists[0].name
              && getSpecialTags(t.name).length <= getSpecialTags(item.track.name).length
            )
            .sort((t1, t2) => new Date(t1.album.release_date) < new Date(t2.album.release_date) ? -1 : 1)
            .sort((t1, t2) => stringSimilarity(item.track.name, t1.name) > stringSimilarity(item.track.name, t2.name) ? -1 : 1 )
            [0]})));
      })).pipe(map(items => {
        const fixed: string[] = [];
        for (let item of items) {
          if (!item.new) continue;
          if (new Date(item.new.album.release_date) < new Date(item.original.track.album.release_date)) {
            fixed.push(`${item.original.track.name} - ${item.original.track.artists[0].name} | ${item.original.track.album.release_date} => ${item.new.album.release_date} | ${item.new.name} - ${item.new.artists[0].name}`);
            item.original.track = item.new;
          }
          item.original.track.fixed_release_time = true;
        }
        console.log('tags fixed:', fixed);

        return playlist;
      }));
    }

    return of(playlist);
  }
}
