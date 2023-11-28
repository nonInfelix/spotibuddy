import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SPlaylist } from '../../interfaces/spotify-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  playlistInfo(): Observable<SPlaylist> {
    return this.http.get<SPlaylist>('http://localhost:3000/user-playlists', {
      withCredentials: true,
    });
  }
  loadMore(offset: number): Observable<SPlaylist> {
    return this.http.get<SPlaylist>(
      `http://localhost:3000/load-more-playlists?offset=${offset}`,
      {
        withCredentials: true,
      }
    );
  }
}
