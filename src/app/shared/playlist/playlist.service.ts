import { Injectable } from '@angular/core';
import { SpotifyPlaylist } from '../spotify-api/spotify-playlist';
import { GameSettings } from '../game-settings';
import { Observable, combineLatest, map, of } from 'rxjs';
import { SpotifyApiService } from '../spotify-api/spotify-api.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private spotifyApi: SpotifyApiService,
  ) { }

  handleRemasters(playlist: SpotifyPlaylist, gameSettings: GameSettings): Observable<SpotifyPlaylist> {

    if (gameSettings.handleRemasters == 'keep') return of(playlist);

    if (gameSettings.handleRemasters == 'remove' ||
        gameSettings.handleRemasters == 'fix') {

      const toHandle = playlist.items.filter(v => {
        if (v.track.fixed_remaster) return false;
        const lower = v.track.name.toLowerCase().replace(/[^\w ]/g,'');
        const i = lower.indexOf('remaster');
        if (i < 0) return false;
        return true
      });

      if (toHandle.length == 0) return of(playlist);

      if (gameSettings.handleRemasters == 'remove') {
        console.log('handleRemasters removed:', toHandle.map(t => `${t.track.name} - ${t.track.artists[0].name} | ${t.track.album.release_date}`));

        playlist.items = playlist.items.filter(v => !toHandle.some(c => c.track.id == v.track.id));

        playlist.total = playlist.items.length;
        return of(playlist);
      }

      return combineLatest(toHandle.map(item => {
        let title = item.track.name;
        const match = /[^\w ]/g.exec(title);
        if (match) title = title.substring(0, match.index).trim();
        return this.spotifyApi.searchTrack(title, item.track.artists[0].name, 20).pipe(
          map(v => ({original: item, new: v.items.sort((t1, t2) => new Date(t1.album.release_date) < new Date(t2.album.release_date) ? -1 : 1)[0]})));
      })).pipe(map(items => {
        const fixed: string[] = [];
        for (let item of items) {
          if (new Date(item.new.album.release_date) < new Date(item.original.track.album.release_date)) {
            fixed.push(`${item.original.track.name} - ${item.original.track.artists[0].name} | ${item.original.track.album.release_date} => ${item.new.album.release_date} | ${item.new.name} - ${item.new.artists[0].name}`);
            item.original.track = item.new;
          }
          item.original.track.fixed_remaster = true;
        }
        console.log('handleRemasters fixed:', fixed);

        return playlist;
      }));
    }

    return of(playlist);
  }
}
