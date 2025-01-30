import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, bufferCount, combineLatest, concatMap, from, map, of, reduce, retry, switchMap } from 'rxjs';
import { SpotifyPlaylist, SpotifyTracks } from './spotify-types';
import { getMarket } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  authorizing: Subject<string> | null = null;

  constructor(private http: HttpClient) { }

  authorize(): Observable<string> {
    const token = localStorage.getItem('spotify_token');
    const expiration = localStorage.getItem('spotify_token_expires');
    if (token && expiration && !isNaN(+expiration) && +expiration > Date.now()) return of(token);
    if (this.authorizing) return this.authorizing;
    this.authorizing = new Subject();
    return this.http.get<{ accessToken: string, accessTokenExpirationTimestampMs: string }>('https://api.codetabs.com/v1/proxy/?quest=https://open.spotify.com/get_access_token').pipe(
      map((r) => {
        if (!r.accessToken) throw new Error('no access token');
        localStorage.setItem('spotify_token', r.accessToken);
        localStorage.setItem('spotify_token_expires', r.accessTokenExpirationTimestampMs);
        this.authorizing?.next(r.accessToken);
        this.authorizing = null;
        return r.accessToken;
      }),
      retry({ count: 3, delay: 2000 }),
    );
  }

  searchAll(searches: string[], chunkSize = 10, limit = 20, type = 'track'): Observable<SpotifyTracks[]> {
    return from(searches).pipe(
      bufferCount(chunkSize),
      concatMap(chunk => combineLatest(chunk.map(v => this.searchTrack(v, limit, type)))),
      reduce((acc: SpotifyTracks[], chunkResponse) => [...acc, ...chunkResponse], []),
    );
  }

  searchTrack(search: string, limit = 20, type = 'track'): Observable<SpotifyTracks> {
    return this.authorize().pipe(
      switchMap(() => this.http.get<{tracks: SpotifyTracks}>('https://api.spotify.com/v1/search', {
        params: {
          q: search,
          limit: limit,
          type: type,
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
