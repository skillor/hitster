import { AfterViewChecked, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem, CdkDragMove, CdkDragRelease, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription, animationFrameScheduler, catchError, interval } from 'rxjs';
import { SpotifyPlaylist, SpotifyPlaylistWithLink } from '../../shared/spotify-api/spotify-playlist';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PlaylistLink, validatePlaylistLink } from '../../shared/playlist/playlist-link';
import { GameSettings } from '../../shared/game-settings';
import * as confetti from 'canvas-confetti';
import { Howl } from 'howler';
import Rand, { PRNG } from 'rand-seed';
import { PlaylistService } from '../../shared/playlist/playlist.service';
import { generateSeed, hasBeenActive, isMobile, randomInRange } from '../../shared/utils';
import { StartingModalComponent } from '../../components/starting-modal/starting-modal.component';

interface GameTrack {
  date: Date,
  title: string,
  artist: string,
  id: string,
  track_url: SafeUrl,
  album_image_url: SafeUrl,
  guessed_correct: boolean,
}

function dateSub(date1: Date, date2: Date): number {
  return date1.getFullYear() - date2.getFullYear()
}

function shuffleArray(array: any[], rng: Rand) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule, RouterModule, StartingModalComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit, OnDestroy, AfterViewChecked {

  playlistLink: PlaylistLink = validatePlaylistLink('assets/playlists/classic-english.json')!;

  gameSettings: GameSettings = {
    keepWrongGuesses: false,
    seed: '',
    handleTimes: 'fix-tags',
    limit: 0,
  };

  hadPreSeed = false;

  firstDate = new Date('0000');
  lastDate = new Date();

  constructor(
    private router: Router,
    private playlistService: PlaylistService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    this.spotifyEmbedUrl = sanitizer.bypassSecurityTrustResourceUrl('');
  }

  currentScrollStep = 0;

  loading = true;

  startingModal = true;

  menuModal = false;
  menuPlayedPrev = false;

  requestFullscreen() {
    document.documentElement.requestFullscreen({ navigationUI: 'hide' }).then(() => setTimeout(() => this.skippingResize = false, 200));
    if (isMobile() && screen.orientation && (<any>screen.orientation).lock)  (<any>screen.orientation).lock('portrait');
    this.skippingResize = true;
  }

  clickFirstStart() {
    if (this.loading) return;
    if (isMobile()) this.requestFullscreen();
    this.startingModal = false;
    this.playPlaybackFromStart();
  }

  skippingResize = false;

  openMenu() {
    this.menuModal = true;
    this.menuPlayedPrev = !this.spotifyPlaybackState.isPaused;
    this.sendSpotifyEmbedCommand({command: 'pause'});
  }

  closeMenu() {
    if (isMobile()) this.requestFullscreen();
    this.menuModal = false;
    if (this.menuPlayedPrev) this.sendSpotifyEmbedCommand({command: 'resume'});
  }

  endModal = false;
  openEndModal() {
    this.endModal = true;
  }

  closeEndModal() {
    this.endModal = false;
  }

  shareGame() {
    const el = document.createElement('input');
    el.value = window.location.href;

    el.style.top = '0';
    el.style.left = '0';
    el.style.position = 'fixed';

    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand('copy');

    document.body.removeChild(el);
  }

  restartGame() {
    if (!this.activePlaylist) {
      this.router.navigate(['home'])
      return;
    }
    this.menuModal = false;
    if (!this.hadPreSeed) this.gameSettings.seed = generateSeed();
    this.updateUrl();
    this.startGame(this.activePlaylist);
  }

  @HostListener('window:resize', ['$event'])
  resizeEvent(event: MessageEvent) {
    if (this.startingModal) return;
    if (this.skippingResize) return;
    if (isMobile()) this.openMenu();
  }

  animationSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap) => this.initGame(paramMap));

    this.animationSubscription = interval(0, animationFrameScheduler).subscribe(() => {
      const scrollStep = this.currentScrollStep;

      if (this.currentScrollStep != 0) document.documentElement.scrollBy(0, scrollStep);
    });
  }

  viewChecked = false;

  ngAfterViewChecked(): void {
    if (!this.viewChecked) {
      document.documentElement.scrollTo(0, document.documentElement.scrollHeight * 0.2);
      this.viewChecked = true;
    }
  }

  ngOnDestroy(): void {
    this.animationSubscription?.unsubscribe();
  }

  updateUrl(): void {
    const url = this.router.createUrlTree(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          p: this.playlistLink.raw,
          s: JSON.stringify(this.gameSettings),
        },
        queryParamsHandling: 'merge',
      }
    );
    this.location.go(url.toString());
  }

  initGame(queryParams: ParamMap): void {
    this.loading = true;
    this.startingModal = true;

    this.menuModal = false;

    let playlist: PlaylistLink | null = validatePlaylistLink(localStorage.getItem('playlist_link'));

    const gameSettings = localStorage.getItem('game_settings');
    if (gameSettings) this.gameSettings = {...this.gameSettings, ...JSON.parse(gameSettings)};

    const queryPlaylistLink = validatePlaylistLink(queryParams.get('p'));
    if (queryPlaylistLink) playlist = queryPlaylistLink;

    const queryGameSettings = queryParams.get('s');
    if (queryGameSettings) try {
      const queryGameSettingsParsed = JSON.parse(queryGameSettings);
      this.gameSettings = {...this.gameSettings, ...queryGameSettingsParsed};
    } catch {}

    if (this.gameSettings.seed) this.hadPreSeed = true;
    else this.gameSettings.seed = generateSeed();

    if (!playlist) {
      this.router.navigate(['home']);
      return;
    }

    this.playlistLink = playlist;

    this.updateUrl();

    if (hasBeenActive() && (!isMobile() || document.fullscreenElement)) {
      this.startingModal = false;
    }

    const playlistCached = localStorage.getItem('cached_playlist');

    if (playlistCached) {
      const cached: SpotifyPlaylistWithLink = JSON.parse(playlistCached);
      if (cached && cached.link == playlist.raw) return this.startGame(cached);
    }

    this.playlistService.get(playlist).pipe(catchError((err) => {
      this.router.navigate(['home']);
      throw err;
    })).subscribe((res) => {
      if (!res) {
        this.router.navigate(['home']);
        return;
      }
      this.firstStartGame(res);
    });
  }

  firstStartGame(playlist: SpotifyPlaylist) {
    this.playlistService.handleTimes(playlist, this.gameSettings).pipe(catchError((err) => {
      this.router.navigate(['home']);
      throw err;
    })).subscribe((res) => {
      this.startGame({
        ...res,
        link: this.playlistLink.raw,
      });
    });
  }

  activePlaylist?: SpotifyPlaylistWithLink;

  startGame(playlist: SpotifyPlaylistWithLink) {
    localStorage.setItem('cached_playlist', JSON.stringify(playlist));

    this.timeListened = 0;
    this.totalStats = {
      guessedWrong: 0,
      guessedRight: 0,
      guessedEarly: 0,
      guessedLate: 0,
      totalDateOff: 0,
      totalSlotOff: 0,
      streak: 0,
      highestStreak: 0,
      totalTimeListened: 0,
    };

    this.activePlaylist = playlist;
    this.viewChecked = false;

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

    this.gamePlaylist.sort((a, b) => a.date < b.date ? -1 : +1);

    if (this.gamePlaylist.length >= 1) {
      const firstYear = this.gamePlaylist[0].date.getFullYear();
      const d = new Date(0);
      d.setFullYear(firstYear - 1 - new Rand(String(firstYear) + playlist.link, PRNG.mulberry32).next() * 50);
      this.firstDate = d;
    }

    shuffleArray(this.gamePlaylist, new Rand(this.gameSettings.seed, PRNG.mulberry32));

    if (this.gameSettings.limit > 0) this.gamePlaylist = this.gamePlaylist.slice(0, this.gameSettings.limit);

    this.guessedTracks = this.gamePlaylist.slice(0, 1);
    // this.guessedTracks = this.gamePlaylist.sort((a, b) => a.date < b.date ? -1 : +1).slice(0, 15);

    this.track_n = this.guessedTracks.length;

    this.tracks = [...Array(this.track_n).keys()];
    this.newd = [-1];

    this.resetGuess();

    this.loading = false;

    if (this.gamePlaylist.length > 1) this.setSpotifyEmbedUrl(this.gamePlaylist[this.track_n].track_url);
    else if (this.gamePlaylist.length == 1) this.setSpotifyEmbedUrl(this.gamePlaylist[0].track_url);

    if (!this.startingModal && hasBeenActive() && this.gamePlaylist.length >= 1) this.playPlaybackFromStart();
  }

  gamePlaylist: GameTrack[] = [];

  guessedTracks: GameTrack[] = [];

  track_n = 0;

  tracks = [0];

  newd = [-1];

  lastGuess: {
    id: string,
    hideAnimation: boolean,
    modalOpen: boolean,
    gameTrack: GameTrack,
    dateDiff: number,
    slotDiff: number,
    correct: boolean,
    absDateDiff: number,
    absSlotDiff: number,
    timeListened: number,
  } | null = null;

  timeListened = 0;
  totalStats = {
    guessedWrong: 0,
    guessedRight: 0,
    guessedEarly: 0,
    guessedLate: 0,
    totalDateOff: 0,
    totalSlotOff: 0,
    streak: 0,
    highestStreak: 0,
    totalTimeListened: 0,
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
      id: nTrack.id,
      hideAnimation: false,
      modalOpen: true,
      correct: slotDiff == 0,
      slotDiff,
      dateDiff,
      absSlotDiff: Math.abs(slotDiff),
      absDateDiff: Math.abs(dateDiff),
      gameTrack: this.gamePlaylist[this.track_n],
      timeListened: this.timeListened,
    };

    if (slotDiff == 0) {
      this.totalStats.guessedRight += 1;
      this.totalStats.streak += 1;
    } else {
      this.totalStats.guessedWrong += 1;
      this.totalStats.streak = 0;
    }

    this.totalStats.highestStreak = Math.max(this.totalStats.highestStreak, this.totalStats.streak);

    if (slotDiff < 0) this.totalStats.guessedEarly += 1;
    if (slotDiff > 0) this.totalStats.guessedLate += 1;
    this.totalStats.totalDateOff += Math.abs(dateDiff);
    this.totalStats.totalSlotOff += Math.abs(slotDiff);
    this.totalStats.totalTimeListened += this.timeListened;
    this.timeListened = 0;

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

    if (this.track_n < this.gamePlaylist.length) {
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
        // this.nextGuess();

        this.wrongSound.play();
      }
    } else { // on finish
      if (slotDiff == 0) this.nextGuess();
      else this.wrongSound.play();
    }
  }

  rightSound = new Howl({src: 'assets/sound-effects/right.mp3'});
  wrongSound = new Howl({src: 'assets/sound-effects/wrong.mp3'});
  wonSound = new Howl({src: 'assets/sound-effects/won.mp3'});
  lostSound = new Howl({src: 'assets/sound-effects/lost.mp3'});

  nextGuess() {
    if (this.lastGuess) this.lastGuess.modalOpen = false;

    if (this.track_n < this.gamePlaylist.length) this.playPlaybackFromStart();
    else  {
      const sum = this.totalStats.guessedRight + this. totalStats.guessedWrong;

      const rightPercentage = (sum > 0 ? this.totalStats.guessedRight / sum : 0);

      this.sendSpotifyEmbedCommand({command: 'pause'});

      if (rightPercentage >= 0.5) {
        const conf = (min: number, max: number) => confetti.default({
          shapes: ['star'],
          colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
          particleCount: 50,
          angle: randomInRange(min, max),
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

        setTimeout(() => conf(45, 75), 0);
        setTimeout(() => conf(105, 135), 230);
        setTimeout(() => conf(45, 75), 500);
        setTimeout(() => conf(75, 105), 500);
        setTimeout(() => conf(105, 135), 500);

        this.wonSound.once('end', () => this.sendSpotifyEmbedCommand({command: 'resume'}));
        this.wonSound.play();
      } else {
        this.lostSound.once('end', () => this.sendSpotifyEmbedCommand({command: 'resume'}));
        this.lostSound.play();
      }
    }
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
    this.playPlaybackFromStart();
  }

  playPlaybackFromStart() {
    this.spotifyPlaybackState.position = 0;
    this.spotifyPlaybackState.isBuffering = true;
    this.playbackSeekValue = this.spotifyPlaybackState.position;
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

  seekPlayback(v: number | undefined = undefined) {
    this.seekDragging = false;
    if (v === undefined) v = this.playbackSeekValue / 1000;
    if (v < 1) this.playPlaybackFromStart();
    else this.sendSpotifyEmbedCommand({command: 'seek', timestamp: v});
    this.spotifyPlaybackState.position = this.playbackSeekValue;
    this.spotifyPlaybackState.isBuffering = true;
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
        this.spotifyPlaybackState.isBuffering = false;
        this.sendSpotifyEmbedCommand(this.replaySpotifyEmbedCommand);
        this.replaySpotifyEmbedCommand = null;
      } else if (event.data.type == 'playback_update') {
        this.spotifyPlaybackState = {
          ...this.spotifyPlaybackState,
          duration: event.data.payload.duration,
          isPaused: event.data.payload.isPaused,
          isBuffering: this.spotifyPlaybackState.isBuffering && this.spotifyPlaybackState.position == event.data.payload.position,
        };
        // TODO: is workaround for skipping position
        if (Math.abs(this.spotifyPlaybackState.position - event.data.payload.position) < 2000) {
          if (!this.seekDragging && this.track_n < this.gamePlaylist.length && this.gamePlaylist[this.track_n].track_url == this.spotifyEmbedUrl) {
            const d = event.data.payload.position - this.spotifyPlaybackState.position;
            if (d > 0) this.timeListened += d;
          }
          this.spotifyPlaybackState.position = event.data.payload.position;
        }

        if (!this.seekDragging) this.playbackSeekValue = this.spotifyPlaybackState.position;
        if (this.spotifyPlaybackState.position == this.spotifyPlaybackState.duration) this.spotifyPlaybackState.isPaused = true;
        if (!hasBeenActive()) this.spotifyPlaybackState.isPaused = true;
        // console.log(this.spotifyPlaybackState);
      } else {
        console.log(event);
      }
    }
  }

  sendSpotifyEmbedCommand(cmd: {command: 'play_from_start' | 'seek' | 'pause' | 'resume', [k: string]: any}) {
    if (cmd == null) return;
    if (cmd.command == 'play_from_start') {
      this.spotifyPlaybackState = {
        ...this.spotifyPlaybackState,
        isPaused: true,
        isBuffering: true,
        position: 0,
      };
    }
    if (!this.spotifyEmbedReady) {
      this.replaySpotifyEmbedCommand = cmd;
      return;
    }
    (<any>document.getElementById('spotify-embed')).contentWindow.postMessage(cmd, '*');
  }

  dragMoved(event: CdkDragMove) {
    const pointerY = event.pointerPosition.y;
    const height = window.innerHeight || document.body.clientHeight;
    const SCROLL_PROXIMITY_THRESHOLD = 0.25;
    if (pointerY < height * SCROLL_PROXIMITY_THRESHOLD) {
      const x = Math.min(1, (height * SCROLL_PROXIMITY_THRESHOLD - pointerY) / (SCROLL_PROXIMITY_THRESHOLD * height));
      this.currentScrollStep = -x * x * 20;
    } else if (pointerY > height * (1 - SCROLL_PROXIMITY_THRESHOLD)) {
      const x = Math.min(1, (pointerY - height * (1 - SCROLL_PROXIMITY_THRESHOLD)) / (SCROLL_PROXIMITY_THRESHOLD * height));
      this.currentScrollStep = x * x * 20;
    } else {
      this.currentScrollStep = 0;
    }
  }

  dragReleased(event: CdkDragRelease) {
    this.currentScrollStep = 0;
    // this.scrollIntoView('drag-list-id-'+this.gamePlaylist[this.track_n].id)
  }

  dragEnded(event: CdkDragEnd) {
  }

  yearText = '';

  dragInnerText = 'Drag Me!';

  move(event: {currentIndex: number, item: {element: {nativeElement: Element}}}) {
    if (this.lastGuess) this.lastGuess.hideAnimation = true;

    let firstDate = this.firstDate;
    if (event.currentIndex > 0) firstDate = this.guessedTracks[event.currentIndex - 1].date;
    let lastDate = this.lastDate;
    if (event.currentIndex < this.guessedTracks.length) lastDate = this.guessedTracks[event.currentIndex].date;
    let t = `${firstDate.getFullYear()} − ${lastDate.getFullYear()}`
    if (firstDate.getFullYear() == lastDate.getFullYear()) t = `${firstDate.getFullYear()}`;

    const els = document.getElementsByClassName('drag-live-hack');
    for (let i = 0; i < els.length; i++) {
      els[i].innerHTML = t;
    }
    this.dragInnerText = t;
    this.yearText = t;
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

  sortPredicate(): (index: number, item: CdkDrag<number>) => boolean {
    return (index: number, item: CdkDrag<number>) => {
      return index == 0 || index >= this.guessedTracks.length || this.guessedTracks[index - 1].date.getFullYear() != this.guessedTracks[index].date.getFullYear();
    };
  }

  noReturnPredicate() {
    return false;
  }
}
