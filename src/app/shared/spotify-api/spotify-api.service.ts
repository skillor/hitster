import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { SpotifyPlaylist, SpotifyTracks } from './spotify-playlist';
import { Router } from '@angular/router';
import { getMarket } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  constructor(private http: HttpClient, private router: Router) { }

  authorize(): Observable<string> {
    const token = localStorage.getItem('spotify_token');
    const expiration = localStorage.getItem('spotify_token_expires');
    if (token && expiration && !isNaN(+expiration) && +expiration > Date.now()) return of(token);
    return this.http.get<{ accessToken: string, accessTokenExpirationTimestampMs: string }>('https://api.codetabs.com/v1/proxy/?quest=https://open.spotify.com/get_access_token').pipe(map((r) => {
      localStorage.setItem('spotify_token', r.accessToken);
      localStorage.setItem('spotify_token_expires', r.accessTokenExpirationTimestampMs);
      return r.accessToken;
    }));
  }

  searchTrack(track: string, artist: string, limit = 1, type = 'track'): Observable<SpotifyTracks> {
    return this.authorize().pipe(
      switchMap(() => this.http.get<{tracks: SpotifyTracks}>('https://api.spotify.com/v1/search', {
        params: {
          q: `track:"${track}" artist:"${artist}"`,
          limit: limit,
          type: 'track',
          market: getMarket(),
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('spotify_token')}`,
        }
      }).pipe(map(v => v.tracks)))
    );
  }

  playlist(playlistId: string): Observable<SpotifyPlaylist> {
    return this.tracks(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 100);
  }

  tracks(url: string, limit = 50, offset = 0): Observable<SpotifyPlaylist> {
    return this.authorize().pipe(
      switchMap(() => this.http.get<SpotifyPlaylist>(url, {
        params: {
          fields: 'items(track(is_playable,id,uri,name,duration_ms,artists(name),album(album_type,name,release_date,release_date_precision,images(url)))),total,limit,offset',
          offset: offset,
          limit: limit,
          market: getMarket(),
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
      ))
    );
  }
}
