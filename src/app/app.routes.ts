import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { HomeComponent } from './home/home.component';
import { PlaylistTracksComponent } from './playlist/playlist-tracks/playlist-tracks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'playlist/:id', component: PlaylistTracksComponent },
];
