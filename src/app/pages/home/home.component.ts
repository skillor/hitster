import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistLink, validatePlaylistLink } from '../../shared/playlist/playlist-link';
import { Router } from '@angular/router';
import { GameSettings, HandleTimesType } from '../../shared/game-settings';
import { hasMobileUserAgent, isMobile } from '../../shared/utils';
import { StartingModalComponent } from '../../components/starting-modal/starting-modal.component';
import { DailyService } from '../../shared/daily/daily.service';
import { catchError, retry } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, StartingModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  hasClipboard = navigator.clipboard && navigator.clipboard.readText;
  loading = true;

  playlists = [
    {title: 'Daily Challenge', link: 'assets/playlists/massive.json', onStart: this.daily.startedDaily, settings: {limit: 8, seed: '', keepWrongGuesses: true, handleTimes: <HandleTimesType>'keep-all'}},
    {title: 'Classic', link: 'assets/playlists/classic-english.json'},
    {title: 'Classic (Deutsch)', link: 'assets/playlists/classic-deutsch.json'},
    {title: 'Perfect Playlist', link: 'assets/playlists/perfect.json'},
    {title: 'Wild Mix', link: 'assets/playlists/wild-mix.json'},
    {title: 'Massive', link: 'assets/playlists/massive.json'},
  ];

  clipboardError = false;
  startingModal = true;
  skippingResize = false;

  requestFullscreen() {
    document.documentElement.requestFullscreen({ navigationUI: 'hide', }).then(() => setTimeout(() => this.skippingResize = false, 200));
    if (isMobile() && screen.orientation && (<any>screen.orientation).lock)  (<any>screen.orientation).lock('portrait');
    this.skippingResize = true;
  }

  clickFirstStart() {
    if (isMobile()) this.requestFullscreen();
    this.startingModal = false;
  }

  @HostListener('window:resize', ['$event'])
  resizeEvent(event: MessageEvent) {
    if (this.startingModal) return;
    if (this.skippingResize) return;
    if (isMobile()) this.startingModal = true;
  }

  constructor(
    private router: Router,
    private daily: DailyService,
  ) { }

  settings: GameSettings = {
    keepWrongGuesses: true,
    seed: '',
    handleTimes: 'fix-tags',
    limit: 0,
  };
  gameSettingsLimit = '';

  validateGameSettingsLimit(): number | null {
    const n = +this.gameSettingsLimit;
    if (isNaN(n) || n < 0) return null;
    return n;
  }

  ngOnInit(): void {
    if (!isMobile() || document.fullscreenElement) {
      this.startingModal = false;
    }

    this.daily.getDailySeed().pipe(
      retry({ count: 3, delay: 2000 }),
      catchError(() => {
        return '';
      }),
    ).subscribe((v) => {
      if (this.playlists[0]?.settings) this.playlists[0].settings.seed = v;
      this.loading = false;
    });

    if (this.daily.hasPlayedToday() && this.playlists.length > 1) {
      this.defaultSelectedPlaylist = 1;
      this.selectedPlaylist = 1;
    }

    const t = localStorage.getItem('game_settings');
    if (t) this.settings = {...this.settings, ...JSON.parse(t)};
    this.settings.seed = '';

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
    if (!t) t = this.playlists[this.selectedPlaylist].link;
    if (!t) t = this.playlists[this.defaultSelectedPlaylist].link;
    return validatePlaylistLink(t);
  }

  inputString: string = '';
  inputChange(): PlaylistLink | null {
    this.selectedPlaylist = this.defaultSelectedPlaylist;

    return this.validateInput();
  }

  defaultSelectedPlaylist = 0;
  selectedPlaylist = 0;
  selectChange() {
    this.inputString = '';
  }

  start() {
    const r = this.validateInput();
    if (!r) return;
    this.startGame(r);
  }

  startGame(r: PlaylistLink) {
    localStorage.removeItem('cached_playlist');

    localStorage.setItem('game_settings', JSON.stringify(this.settings));

    const limit = this.validateGameSettingsLimit();
    if (limit !== null) this.settings.limit = limit;
    if (!this.inputString) {
      const playlist = this.playlists[this.selectedPlaylist];
      this.settings = {...this.settings, ...playlist.settings};
      if (playlist.onStart) playlist.onStart();
    }
    this.router.navigate(
      ['play'],
      {
        queryParams: {
          p: r.raw,
          s: JSON.stringify(this.settings),
        },
        queryParamsHandling: 'merge',
      }
    );
  }

  hasMobileUserAgent = hasMobileUserAgent();
  removeSpotifyEmbed = hasMobileUserAgent();
  disableSpotifyLogin = true;

  @HostListener('window:message', ['$event'])
  messageEvent(event: MessageEvent) {
    if (event.origin == 'https://open.spotify.com') {
      if (event.data.type == 'ready') {
        (<any>document.getElementById('spotify-embed')).contentWindow.postMessage({command: 'play_from_start'}, '*');
      } else if (event.data.type == 'playback_update') {
        if (event.data.payload.duration == 0) return;
        if (event.data.payload.duration < 43300) this.disableSpotifyLogin = false;
        this.removeSpotifyEmbed = true;
      }
    }
  }
}
