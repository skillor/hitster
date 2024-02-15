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
  hiddenInputString = 'assets/playlists/classic-english.json';

  playlists = {
    'Classic': 'assets/playlists/classic-english.json',
    'Classic (Deutsch)': 'assets/playlists/classic-deutsch.json',
    'Wild Mix': 'assets/playlists/wild-mix.json',
    'Perfect Playlist': 'assets/playlists/perfect.json',
  };

  loading = false;

  constructor(private router: Router, private spotifyApi: SpotifyApiService) { }

  ngOnInit(): void {
    document.exitFullscreen().catch(() => {});

    const t = localStorage.getItem('game_settings');
    if (t) this.settings = {...this.settings, ...JSON.parse(t)};

    this.selectString = this.hiddenInputString;

    this.validateInput();
  }

  paste() {
    navigator.clipboard.readText().then((text) => {
      if (this.validatePlaylistLink(text)) {
        this.inputString = text;
        this.inputChange();
      }
    });
  }

  validatePlaylistLink(t: string): PlaylistLink | null {
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

  validateInput(): PlaylistLink | null {
    let t = this.inputString;
    if (t == '') t = this.hiddenInputString;

    return this.validatePlaylistLink(t);
  }

  inputString = '';
  inputChange(): PlaylistLink | null {
    this.selectString = '';

    return this.validateInput();
  }

  selectString = '';
  selectChange() {
    this.inputString = '';
    this.hiddenInputString = this.selectString;
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
