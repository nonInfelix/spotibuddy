import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SPlaylist,
  SPlaylistItems,
  STracks,
} from '../../interfaces/spotify-interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  // Datenstrom der von TrackComponent abonniert werden kann
  private currentPlaylistSource = new BehaviorSubject<SPlaylistItems | null>(
    null
  );
  currentPlaylist = this.currentPlaylistSource.asObservable();

  constructor(private http: HttpClient) {}

  playlistInfo(): Observable<SPlaylist> {
    return this.http.get<SPlaylist>(
      'https://spotibuddy-api.vercel.app/user-playlists',
      {
        withCredentials: true,
      }
    );
  }
  loadMore(offset: number): Observable<SPlaylist> {
    return this.http.get<SPlaylist>(
      `https://spotibuddy-api.vercel.app/load-more-playlists?offset=${offset}`,
      {
        withCredentials: true,
      }
    );
  }
  tracksInfo(id: string): Observable<STracks[]> {
    return this.http.get<STracks[]>(
      `https://spotibuddy-api.vercel.app/playlist-tracks?id=${id}`,
      {
        withCredentials: true,
      }
    );
  }

  // Methode die wir in der Playlist Komponente aufrufen, um Werte zu übergeben
  changePlaylist(playlist: SPlaylistItems) {
    this.currentPlaylistSource.next(playlist);
  }
}
