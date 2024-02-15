import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PlayComponent } from './pages/play/play.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'play', component: PlayComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
