import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { SPlaylistItems, STracks } from '../../../interfaces/spotify-interface';

@Component({
  selector: 'app-playlist-tracks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist-tracks.component.html',
  styleUrl: './playlist-tracks.component.scss',
})
export class PlaylistTracksComponent implements OnInit {
  id!: string;
  tracks: STracks[] = [];
  currentPlaylist!: SPlaylistItems | null;

  constructor(private spotify: SpotifyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    // empfangen der Daten aus dem BehaviorSubject
    this.spotify.currentPlaylist.subscribe((playlist) => {
      this.currentPlaylist = playlist;
    });

    this.spotify.tracksInfo(this.id).subscribe((res) => {
      console.log(res);
      this.tracks.push(...res);
    });
  }
}
