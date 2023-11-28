import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { SPlaylist, SPlaylistItems } from '../../interfaces/spotify-interface';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent {
  playlists!: SPlaylistItems[];
  offset: number = 50;
  isFullyLoaded: boolean = false;

  constructor(private spotify: SpotifyService) {}

  // funktion für ngFor trackBy
  trackByPlaylistID(index: number, playlist: any): string {
    return playlist.id; //
  }

  getPlaylists() {
    this.spotify.playlistInfo().subscribe((res: SPlaylist) => {
      console.log(res);
      this.playlists = res.items;
    });
  }
  loadMorePlaylists() {
    this.spotify.loadMore(this.offset).subscribe((res: SPlaylist) => {
      console.log(res);
      this.playlists.push(...res.items);
      this.offset += 50;
      if (res.total == this.playlists.length) {
        this.isFullyLoaded = true;
      }
    });
  }
}
