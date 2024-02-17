import { Component, HostListener } from '@angular/core';
import { SpotifyApiService } from '../../shared/spotify-api/spotify-api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistLink, validatePlaylistLink } from '../../shared/playlist-link';
import { Router } from '@angular/router';
import { GameSettings } from '../../shared/game-settings';
import { isMobile } from '../../shared/utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  hasClipboard = navigator.clipboard && navigator.clipboard.readText;

  hiddenInputString = 'assets/playlists/classic-english.json';

  playlists = {
    'Classic': 'assets/playlists/classic-english.json',
    'Classic (Deutsch)': 'assets/playlists/classic-deutsch.json',
    'Wild Mix': 'assets/playlists/wild-mix.json',
    'Perfect Playlist': 'assets/playlists/perfect.json',
  };

  loading = false;
  clipboardError = false;

  constructor(private router: Router, private spotifyApi: SpotifyApiService) { }

  settings: GameSettings = {
    keepWrongGuesses: true,
    seed: '',
    handleRemasters: 'fix',
  };

  ngOnInit(): void {
    document.exitFullscreen().catch(() => {});

    const t = localStorage.getItem('game_settings');
    if (t) this.settings = {...this.settings, ...JSON.parse(t)};
    this.settings.seed = '';

    this.selectString = this.hiddenInputString;

    this.validateInput();
  }

  paste() {
    navigator.clipboard.readText().then((text) => {
      if (validatePlaylistLink(text)) {
        this.inputString = text;
        this.inputChange();
      } else {
        this.clipboardError = true;
      }
    }).catch(() => {});
  }

  validateInput(): PlaylistLink | null {
    let t = this.inputString;
    if (t == '') t = this.hiddenInputString;

    return validatePlaylistLink(t);
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

  start() {
    const r = this.inputChange();
    if (!r) return;
    this.startGame(r);
  }

  startGame(r: PlaylistLink) {
    this.loading = true;

    localStorage.removeItem('cached_playlist');

    localStorage.setItem('game_settings', JSON.stringify(this.settings));

    localStorage.setItem('playlist_link', r.raw);

    if (r.type == 'spotify-playlist' || r.type == 'json') {
      this.router.navigate(['play'])
      return;
    }
  }

  isMobile = isMobile();
  removeSpotifyEmbed = this.isMobile;
  disableSpotifyLogin = true;

  @HostListener('window:message', ['$event'])
  messageEvent(event: MessageEvent) {
    if (event.origin == 'https://open.spotify.com') {
      if (event.data.type == 'ready') {
        (<any>document.getElementById('spotify-embed')).contentWindow.postMessage({command: 'play_from_start'}, '*');
      } else if (event.data.type == 'playback_update') {
        if (event.data.payload.duration < 43300) this.disableSpotifyLogin = false;
        this.removeSpotifyEmbed = true;
      }
    }
  }
}
