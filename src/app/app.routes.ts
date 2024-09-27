import { Routes } from '@angular/router';
import { HomeComponent } from '@pages/home/home.component';
import { PlaylistComponent } from '@pages/playlist/playlist.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent,
    data: {
      title: 'Playlist'
    }
  }
];
