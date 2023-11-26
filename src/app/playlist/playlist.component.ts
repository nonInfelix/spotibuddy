import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  playlists!: any;

  constructor(private spotify: SpotifyService) {}

  // funktion für ngFor trackBy
  trackByPlaylistID(index: number, playlist: any): string {
    return playlist.id; //
  }

  getPlaylists() {
    this.spotify.playlistInfo().subscribe((res) => {
      console.log(res);
      this.playlists = res.items;
    });
  }
}
