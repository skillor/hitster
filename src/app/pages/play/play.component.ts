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

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule, RouterModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {

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

  ngOnInit(): void {
    const t = localStorage.getItem('playlist_link');

    if (!t) {
      this.router.navigate(['home']);
      return;
    }

    const playlist: PlaylistLink = JSON.parse(t);

    // const playlistRaw = localStorage.getItem('spotify_playlist_raw');

    // if (playlistRaw) {
    //   this.startGame(JSON.parse(playlistRaw));
    //   return;
    // }

    if (playlist.type == 'spotify') {
      this.spotifyApi.playlist(playlist.payload).pipe(catchError((err, res) => {
        if (err.status && err.status == 401) {
          this.spotifyApi.authorize();
          throw err;
        }
        this.router.navigate(['home']);
        throw err;
      })).subscribe((res) => {
        // console.log(res);
        // localStorage.setItem('spotify_playlist_raw', JSON.stringify(res));
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

    this.gamePlaylist = playlist.items.map((v) => {
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
    shuffleArray(this.gamePlaylist);

    this.guessedTracks = [
      this.gamePlaylist[0],
    ];
    // console.log(this.gamePlaylist);
    this.loading = false;

    this.setSpotifyEmbedUrl(this.gamePlaylist[this.track_n].track_url);

    if (navigator.userActivation.hasBeenActive) this.sendSpotifyEmbedCommand({command: 'play_from_start'});
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

  guess() {
    this.dragInnerText = 'Drag Me!';

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
    // this.tracks = [...Array(this.tracks.length).keys()];
    this.newd = [-1];

    this.setSpotifyEmbedUrl(this.gamePlaylist[this.track_n].track_url);

    if (slotDiff == 0) this.nextGuess();
  }

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

  seekPlayback() {
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
        this.playbackSeekValue = this.spotifyPlaybackState.position;
        if (this.spotifyPlaybackState.position == this.spotifyPlaybackState.duration) this.spotifyPlaybackState.isPaused = true;
        if (!navigator.userActivation.hasBeenActive) this.spotifyPlaybackState.isPaused = true;
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

  noReturnPredicate() {
    return false;
  }
}
