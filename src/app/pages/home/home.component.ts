import { Component } from '@angular/core';
import { SpotifyApiService } from '../../shared/spotify-api/spotify-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistLink } from '../../shared/playlist-link';
import { Router } from '@angular/router';
import { GameSettings } from '../../shared/game-settings';

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

  loading = false;

  constructor(private router: Router, private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
    const t = localStorage.getItem('game_settings');
    if (t) this.settings = {...this.settings, ...JSON.parse(t)};

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

  settings: GameSettings = {
    keepWrongGuesses: true,
  };

  start() {
    const r = this.inputChange();
    if (!r) return;
    this.startGame(r);
  }

  startGame(r: PlaylistLink) {
    this.loading = true;

    localStorage.removeItem('cached_playlist');

    localStorage.setItem('game_settings', JSON.stringify(this.settings));

    localStorage.setItem('playlist_link', JSON.stringify(r));

    if (r.type == 'spotify') {
      this.spotifyApi.authorize();
      return;
    }
    if (r.type == 'json') {
      this.router.navigate(['play'])
      return;
    }
  }
}
