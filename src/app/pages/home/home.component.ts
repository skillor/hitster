import { Component, ViewChild } from '@angular/core';
import { SpotifyApiService } from '../../shared/spotify-api/spotify-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistLink } from '../../shared/playlist_link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  defaultPlaylist = 'assets/playlists/ultimate.json';

  playlists = {
    'Ultimate Playlist': 'assets/playlists/ultimate.json',
  };

  constructor(private router: Router, private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
    this.inputChange();
  }

  inputString = '';
  inputChange(): PlaylistLink | null {
    let t = this.inputString;
    if (t == '') {
      t = this.defaultPlaylist;
    }

    let i = t.indexOf('spotify.com/playlist/');
    if (i >= 0) {
      t = t.substring(i + 21);
      i = t.indexOf('?');
      if (i >= 0) t = t.substring(0, t.indexOf('?'))
      return { type: 'spotify', payload: t };
    }

    if (t.endsWith('.json')) {
      return { type: 'json', payload: t };
    }

    return null;
  }

  selectString = '';
  selectChange() {
    // console.log(this.selectString);
    this.inputString = this.selectString;
  }

  start() {
    const r = this.inputChange();
    if (!r) return;
    if (r.type == 'spotify') {
      localStorage.setItem('playlist_link', JSON.stringify(r));
      this.spotifyApi.authorize();
      return;
    }
    if (r.type == 'json') {
      localStorage.setItem('playlist_link', JSON.stringify(r));
      this.router.navigate(['play'])
      return;
    }
  }
}
