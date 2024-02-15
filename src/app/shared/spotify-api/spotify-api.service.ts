import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { SpotifyPlaylist } from './spotify-playlist';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  constructor(private http: HttpClient, private router: Router) { }

  authorize(): void {
    this.http.get<{accessToken?: string}>('https://api.codetabs.com/v1/proxy/?quest=https://open.spotify.com/get_access_token').subscribe((r) => {
      if (r.accessToken) {
        localStorage.setItem(`spotify_token`, r.accessToken);
      }
      this.router.navigate(['play']);
    });
  }

  playlist(playlistId: string): Observable<SpotifyPlaylist> {
    return this.tracks(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 100);
  }

  tracks(url: string, limit = 50, offset = 0): Observable<SpotifyPlaylist> {
    return this.http.get<SpotifyPlaylist>(url, {
      params: {
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
