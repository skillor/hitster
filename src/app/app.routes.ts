import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SpotifyAuthComponent } from './pages/spotify-auth/spotify-auth.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'play', component: PlayComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: SpotifyAuthComponent,  },
];
