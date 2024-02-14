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
  authScope = 'user-read-private user-library-read';
  authRedirectUri = location.origin + location.pathname;
  authName = 'spotify';

  constructor(private http: HttpClient) {
    super();
  }

  playlist(playlistId: string): Observable<SpotifyPlaylist> {
    return this.tracks(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 100);
  }

  savedTracks(): Observable<SpotifyPlaylist> {
    return this.tracks('https://api.spotify.com/v1/me/tracks', 50);
  }

  tracks(url: string, limit = 50, offset = 0): Observable<SpotifyPlaylist> {
    return this.http.get<SpotifyPlaylist>(url, {
      params: {
        market: 'DE',
        fields: 'items(track(id,uri,name,duration_ms,artists(name),album(album_type,name,release_date,release_date_precision,images(url)))),total,limit,offset',
        offset: offset,
        limit: limit,
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`,
      }
    }).pipe(
      switchMap((res) => {
        if (res.total < res.offset + res.limit) return of(res);
        return this.tracks(url, limit, res.offset + res.limit).pipe(map((res2) => {
          res.items.push(...res2.items);
          return res;
        }));
      })
    );
  }
}
