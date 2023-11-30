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

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UserComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  playlists!: SPlaylistItems[];
  offset: number = 50;
  isFullyLoaded: boolean = false;
  currentPlaylist!: SPlaylistItems;

  constructor(private spotify: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.getPlaylists();
  }

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
