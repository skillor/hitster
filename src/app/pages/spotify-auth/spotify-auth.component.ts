import { Component, OnInit } from '@angular/core';
import { SpotifyApiService } from '../../shared/spotify-api/spotify-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotify-auth',
  standalone: true,
  imports: [],
  templateUrl: './spotify-auth.component.html',
  styleUrl: './spotify-auth.component.css'
})
export class SpotifyAuthComponent implements OnInit {
  constructor(private spotifyApi: SpotifyApiService, private router: Router) {}

  async ngOnInit() {
    this.spotifyApi.setToken();
    this.router.navigate(['play']);
  }
}
