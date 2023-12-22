import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { HttpClientModule } from '@angular/common/http';
import {
  SPlaylist,
  SPlaylistItems,
  STracks,
} from '../../interfaces/spotify-interface';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    UserComponent,
    ButtonModule,
    CardModule,
    AvatarGroupModule,
    AvatarModule,
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  playlists!: SPlaylistItems[];
  offset: number = 50;
  isFullyLoaded: boolean = false;
  currentPlaylist!: SPlaylistItems;

  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // token wird im frontend gesetzt, da api auf anderer domain läuft
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];
      let maxAge = params['maxAge'];
      maxAge = Number(maxAge) * 1000;
      let expires = new Date();
      expires.setTime(expires.getTime() + maxAge);
      document.cookie = `access_token=${accessToken};expires=${expires.toUTCString()}`;
      document.cookie = `refresh_token=${refreshToken};expires=${expires.toUTCString()}`;
    });
    this.getPlaylists();
  }

  // funktion für ngFor trackBy
  trackByPlaylistID(index: number, playlist: any): string {
    return playlist.id; //
  }

  getPlaylists() {
    this.spotify.playlistInfo().subscribe((res: SPlaylist) => {
      console.log('response from getPlaylists  ', res);
      this.playlists = res.items;
      this.offset += 50;
    });
  }
  loadMorePlaylists() {
    this.spotify.loadMore(this.offset).subscribe((res: SPlaylist) => {
      console.log('loading more playlists: ', res);
      this.playlists.push(...res.items);
      this.offset += 50;
      if (res.total == this.playlists.length) {
        this.isFullyLoaded = true;
      }
    });
  }
  onPlaylistClick(playlist: SPlaylistItems) {
    this.currentPlaylist = playlist;
    this.UpdateCurrentPlaylist(); // Aufruf der Methode für das BehaviorSubject
    this.router.navigate(['/playlist', playlist.id]);
  }
  //Methode um die Playlist an das BehavioSubject zu übergeben
  UpdateCurrentPlaylist() {
    this.spotify.changePlaylist(this.currentPlaylist);
  }
}
