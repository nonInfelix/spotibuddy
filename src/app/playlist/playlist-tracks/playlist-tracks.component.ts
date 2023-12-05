import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { SPlaylistItems, STracks } from '../../../interfaces/spotify-interface';
import { Subscription } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-playlist-tracks',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessagesModule],
  templateUrl: './playlist-tracks.component.html',
  styleUrl: './playlist-tracks.component.scss',
})
export class PlaylistTracksComponent implements OnInit, OnDestroy {
  id!: string;
  tracks: STracks[] = [];
  currentPlaylist!: SPlaylistItems | null;
  private tracksSubscription!: Subscription | null; // Subscription zuweisung für unsubscribe

  constructor(private spotify: SpotifyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;

    // empfangen der Daten aus dem BehaviorSubject
    this.spotify.currentPlaylist.subscribe((playlist) => {
      this.currentPlaylist = playlist;
    });
    this.tracksSubscription = this.spotify
      .tracksInfo(this.id)
      .subscribe((res) => {
        console.log('response for tracks ', res);
        this.tracks = [];
        this.tracks.push(...res);
      });
  }

  ngOnDestroy(): void {
    if (this.tracksSubscription !== null) {
      // deabonnieren des Subjects
      this.tracksSubscription.unsubscribe();
    }
  }
}
