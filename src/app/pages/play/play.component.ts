import { Component, HostListener, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SpotifyApiService } from '../../shared/spotify-api/spotify-api.service';
import { catchError } from 'rxjs';
import { SpotifyPlaylist } from '../../shared/spotify-api/spotify-playlist';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PlaylistLink } from '../../shared/playlist-link';
import { HttpClient } from '@angular/common/http';
import { GameSettings } from '../../shared/game-settings';
import * as confetti from 'canvas-confetti';
import { Howl } from 'howler';
import Rand from 'rand-seed';

interface GameTrack {
  date: Date,
  title: string,
  artist: string,
  id: string,
  track_url: SafeUrl,
  album_image_url: SafeUrl,
  guessed_correct: boolean
}

function dateSub(date1: Date, date2: Date): number {
  return date1.getFullYear() - date2.getFullYear()
}

function generateSeed(length = 16, pool = '01234567890abcdefghijklmnopqrstuvwxyz'): string {
  return [...new Array(16)].map((v) => pool[Math.floor(Math.random() * pool.length)]).join('');
}

function shuffleArray(array: any[], rng: Rand) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function hasBeenActive(): boolean {
  return navigator && navigator.userActivation && navigator.userActivation.hasBeenActive;
}

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule, RouterModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {

  document = document;

  gameSettings: GameSettings = {
    keepWrongGuesses: false,
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private spotifyApi: SpotifyApiService,
    private sanitizer: DomSanitizer,
  ) {
    this.spotifyEmbedUrl = sanitizer.bypassSecurityTrustResourceUrl('');
  }

  loading = true;

  startingModal = true;

  menuModal = false;

  isMobile = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ].some((item) => navigator.userAgent.match(item));

  requestFullscreen() {
    document.documentElement.requestFullscreen({ navigationUI: "hide" });
    this.skipNextResize = true;
  }

  firstStart() {
    if (this.loading) return;
    if (this.isMobile) this.requestFullscreen();
    this.startingModal = false;
    this.sendSpotifyEmbedCommand({command: 'play_from_start'});
  }

  skipNextResize = true;

  openMenu() {
    this.menuModal = true;
  }

  closeMenu() {
    // if (this.isMobile) this.requestFullscreen();
    this.menuModal = false;
  }

  toggleFullscreen() {
    if (document.fullscreenElement) this.document.exitFullscreen().catch(() => {});
    else this.requestFullscreen();
  }

  @HostListener('window:resize', ['$event'])
  resizeEvent(event: MessageEvent) {
    if (this.startingModal) return;
    if (this.skipNextResize) {
      setTimeout(() => this.skipNextResize = false, 100);
      return;
    }
    if (this.isMobile) this.menuModal = true;
  }

  ngOnInit(): void {
    const t = localStorage.getItem('playlist_link');

    if (!t) {
      this.router.navigate(['home']);
      return;
    }

    if (hasBeenActive() && !this.isMobile) {
      this.startingModal = false;
    }

    const playlist: PlaylistLink = JSON.parse(t);

    const playlistCached = localStorage.getItem('cached_playlist');

    if (playlistCached) {
      this.startGame(JSON.parse(playlistCached));
      return;
    }

    if (playlist.type == 'spotify') {
      this.spotifyApi.playlist(playlist.payload).pipe(catchError((err) => {
        if (err.status && err.status == 401) {
          this.spotifyApi.authorize();
          throw err;
        }
        this.router.navigate(['home']);
        throw err;
      })).subscribe((res) => {
        this.startGame(res);
      });
      return;
    }

    if (playlist.type == 'json') {
      this.http.get<SpotifyPlaylist>(playlist.payload).pipe(catchError((err) => {
        this.router.navigate(['home']);
        throw err;
      })).subscribe((res) => {
        this.startGame(res);
      });
      return;
    }

    this.router.navigate(['home']);
  }

  startGame(playlist: SpotifyPlaylist) {
    const t = localStorage.getItem('game_settings');
    if (t) this.gameSettings = {...this.gameSettings, ...JSON.parse(t)};

    localStorage.setItem('cached_playlist', JSON.stringify(playlist));

    this.gamePlaylist = playlist.items.filter(
      (v) => v.track.is_playable !== false,
    ).map((v) => {
      let album_image_url = '';
      if (v.track.album.images.length > 0) album_image_url = v.track.album.images[0].url;
      for (let img of v.track.album.images) {
        if (img.width == 300 && img.height == 300) {
          album_image_url = img.url;
          break;
        }
      }
      return {
        guessed_correct: true,
        date: new Date(v.track.album.release_date),
        title: v.track.name,
        // artist: v.track.artists.map(v => v.name).join(', '),
        artist: v.track.artists[0].name,
        id: v.track.id,
        album_image_url: this.sanitizer.bypassSecurityTrustResourceUrl(album_image_url),
        track_url: this.sanitizer.bypassSecurityTrustResourceUrl(`https://open.spotify.com/embed/track/${v.track.id}?utm_source=generator`)
      // preview_url: this.sanitizer.bypassSecurityTrustResourceUrl(v.track.preview_url),
    }});

    let seed = generateSeed();
    if (this.gameSettings && this.gameSettings.seed) seed = this.gameSettings.seed;
    else this.gameSettings.seed = seed;
    shuffleArray(this.gamePlaylist, new Rand(seed));

    this.guessedTracks = this.gamePlaylist.slice(0, 1);
    // this.guessedTracks = this.gamePlaylist.slice(0, 15);
    this.loading = false;

    this.track_n = this.guessedTracks.length;

    this.tracks = [...Array(this.track_n).keys()];

    if (this.gamePlaylist.length > 1) this.setSpotifyEmbedUrl(this.gamePlaylist[this.track_n].track_url);
    else if (this.gamePlaylist.length == 1) this.setSpotifyEmbedUrl(this.gamePlaylist[0].track_url);

    if (!this.startingModal && hasBeenActive() && this.gamePlaylist.length >= 1) this.sendSpotifyEmbedCommand({command: 'play_from_start'});
  }

  gamePlaylist: GameTrack[] = [];

  guessedTracks: GameTrack[] = [];

  track_n = 1;

  tracks = [0];

  newd = [-1];

  lastGuess: {
    gameTrack: GameTrack,
    dateDiff: number,
    slotDiff: number,
    absDateDiff: number,
    absSlotDiff: number,
  } | null = null;

  totalStats = {
    guessedWrong: 0,
    guessedRight: 0,
    guessedEarly: 0,
    guessedLate: 0,
    totalDateOff: 0,
    totalSlotOff: 0,
    streak: 0,
  };

  resetGuess() {
    this.dragInnerText = 'Drag Me!';
    this.yearText = '';
  }

  guess() {
    this.resetGuess();

    const track_n = this.tracks.length - 1;
    let i = this.tracks.findIndex(v => v == -1);
    const nTrack = this.gamePlaylist[this.track_n];
    let slotDiff = 0;
    let dateDiff = 0;
    if (i > 0 && dateSub(this.guessedTracks[i - 1].date, nTrack.date) > 0) {
      dateDiff = dateSub(this.guessedTracks[i - 1].date, nTrack.date)
      slotDiff = 1;
      i -= 1;
      while (i > 0) {
        if (dateSub(this.guessedTracks[i - 1].date, nTrack.date) <= 0) break;
        i -= 1;
        slotDiff += 1;
      }
    } else if (i < track_n && dateSub(nTrack.date, this.guessedTracks[i].date) > 0) {
      dateDiff = -dateSub(nTrack.date, this.guessedTracks[i].date);
      slotDiff = -1;
      i += 1;
      while (i < track_n) {
        if (dateSub(nTrack.date, this.guessedTracks[i].date) <= 0) break;
        i += 1;
        slotDiff -= 1;
      }
    }

    this.lastGuess = {
      slotDiff,
      dateDiff,
      absSlotDiff: Math.abs(slotDiff),
      absDateDiff: Math.abs(dateDiff),
      gameTrack: this.gamePlaylist[this.track_n],
    };

    if (slotDiff == 0) {
      this.totalStats.guessedRight += 1;
      this.totalStats.streak += 1;
    } else {
      this.totalStats.guessedWrong += 1;
      this.totalStats.streak = 0;
    }
    if (slotDiff < 0) this.totalStats.guessedEarly += 1;
    if (slotDiff > 0) this.totalStats.guessedLate += 1;
    this.totalStats.totalDateOff += Math.abs(dateDiff);
    this.totalStats.totalSlotOff += Math.abs(slotDiff);

    if (this.gameSettings.keepWrongGuesses || slotDiff == 0) {
      this.guessedTracks.splice(i, 0, this.gamePlaylist[this.track_n]);
      this.tracks = [...Array(this.tracks.length).keys()];
    } else {
      this.tracks = [...Array(this.tracks.length - 1).keys()];
    }

    if (slotDiff != 0) {
      this.gamePlaylist[this.track_n].guessed_correct = false;
    }

    this.track_n += 1;
    this.newd = [-1];

    this.setSpotifyEmbedUrl(this.gamePlaylist[this.track_n].track_url);

    if (slotDiff == 0) {
      this.nextGuess();

      confetti.default({
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
        particleCount: 50,
        spread: 50,
        gravity: 0,
        decay: 0.95,
        startVelocity: 20,
        scalar: 0.75,
        ticks: 50,
        origin: {
            y: 0.9,
            x: 0.5,
        },
        zIndex: 5000,
    });

      this.rightSound.play();
    } else {
      this.wrongSound.play();
    }
  }

  rightSound: Howl = new Howl({src: 'assets/sound-effects/right.mp3'});
  wrongSound: Howl = new Howl({src: 'assets/sound-effects/wrong.mp3'});

  nextGuess() {
    this.lastGuess = null;

    this.sendSpotifyEmbedCommand({command: 'play_from_start'});
    // console.log('next');
  }

  spotifyEmbedReady = false;
  replaySpotifyEmbedCommand: any = null;
  spotifyEmbedUrl: SafeUrl;

  playbackSeekValue = 0;

  spotifyPlaybackState = {
    isPaused: true,
    isBuffering: true,
    duration: 0,
    position: 0,
  };

  toggleOtherSong(url: SafeUrl) {
    if (url == this.spotifyEmbedUrl) {
      this.togglePlayback();
      return;
    }
    this.setSpotifyEmbedUrl(url);
    this.sendSpotifyEmbedCommand({command: 'play_from_start'});
  }

  revertPlayback() {
    this.sendSpotifyEmbedCommand({command: 'play_from_start' });
  }

  togglePlayback() {
    // console.log(this.spotifyPlaybackState)
    if (this.spotifyPlaybackState.isPaused) {
      this.sendSpotifyEmbedCommand({command: 'resume'});
    } else {
      this.sendSpotifyEmbedCommand({command: 'pause'});
    }
  }

  seekDragging = false;

  seekPlaybackStart() {
    this.seekDragging = true;
  }

  seekPlayback() {
    this.seekDragging = false;
    this.sendSpotifyEmbedCommand({command: 'seek', timestamp: this.playbackSeekValue / 1000});
    this.spotifyPlaybackState.position = this.playbackSeekValue;
    // console.log('seek');
  }

  setSpotifyEmbedUrl(url: SafeUrl) {
    this.spotifyEmbedReady = false;
    this.spotifyPlaybackState = {
      isPaused: true,
      isBuffering: true,
      duration: 0,
      position: 0,
    };
    this.spotifyEmbedUrl = url;
  }

  @HostListener('window:message', ['$event'])
  messageEvent(event: MessageEvent) {
    if (event.origin == 'https://open.spotify.com') {
      if (event.data.type == 'ready') {
        this.spotifyEmbedReady = true;
        this.sendSpotifyEmbedCommand(this.replaySpotifyEmbedCommand);
        this.spotifyPlaybackState.isBuffering = false;
        this.replaySpotifyEmbedCommand = null;
      } else if (event.data.type == 'playback_update') {
        this.spotifyPlaybackState = event.data.payload;
        if (!this.seekDragging) this.playbackSeekValue = this.spotifyPlaybackState.position;
        if (this.spotifyPlaybackState.position == this.spotifyPlaybackState.duration) this.spotifyPlaybackState.isPaused = true;
        if (!hasBeenActive()) this.spotifyPlaybackState.isPaused = true;
        // console.log(this.spotifyPlaybackState);
      } else {
        console.log(event);
      }
    }
  }

  sendSpotifyEmbedCommand(cmd: any) {
    if (cmd == null) return;
    if (!this.spotifyEmbedReady) {
      this.replaySpotifyEmbedCommand = cmd;
      return;
    }
    (<any>document.getElementById('spotify-embed')).contentWindow.postMessage(cmd, '*');
  }

  yearText = '';

  dragInnerText = 'Drag Me!';

  move(event: {currentIndex: number, item: {element: {nativeElement: Element}}}) {
    let t = '';
    if (event.currentIndex > 0) t += this.guessedTracks[event.currentIndex - 1].date.getFullYear();
    t += ' − ';
    if (event.currentIndex < this.guessedTracks.length) t += this.guessedTracks[event.currentIndex].date.getFullYear();
    const els = document.getElementsByClassName('drag-live-hack');
    for (let i = 0; i < els.length; i++) {
      els[i].innerHTML = t;
    }
    this.dragInnerText = t;
    this.yearText = t;
    // event.item.element.nativeElement.getElementsByClassName('drag-live-hack')[0].innerHTML = t;
  }


  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  revert() {
    this.newd = [-1];
    const index = this.tracks.indexOf(-1);
    if (index > -1) {
      this.tracks.splice(index, 1);
    }
    this.resetGuess();
  }

  noReturnPredicate() {
    return false;
  }
}
