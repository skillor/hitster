import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent) },
  { path: 'play', loadComponent: () => import('./pages/play/play.component').then(mod => mod.PlayComponent) },
  { path: '**', redirectTo: 'home' },
];
