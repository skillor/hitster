import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { OauthApi } from '../oauth-api/oauth-api';
import { SpotifyPlaylist } from './spotify-playlist';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService extends OauthApi {
  authClientId = '7c99dc0bed3d454493f3a3c32208e4ba';
  authUrl = 'https://accounts.spotify.com/authorize';
  authScope = 'user-read-private';
  authRedirectUri = location.origin + location.pathname;
  authName = 'spotify';

  constructor(private http: HttpClient) {
    super();
  }

  playlist(playlistId: string, offset = 0): Observable<SpotifyPlaylist> {
    return this.http.get<SpotifyPlaylist>(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      params: {
        market: 'DE',
        fields: 'items(track(id,uri,name,duration_ms,artists(name),album(album_type,name,release_date,release_date_precision,images(url)))),total',
        offset: offset,
        limit: 100,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`,
      }
    }).pipe(
      switchMap((res) => {
        if (res.total < offset + 100) return of(res);
        return this.playlist(playlistId, offset + 100).pipe(map((res2) => {
          res.items.push(...res2.items);
          return {items: res.items, total: res.total};
        }));
      })
    );
  }
}
