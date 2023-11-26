import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  tokenObj!: {};

  getToken() {
    return this.http.get('http://localhost:3000/auth');
  }

  userInfo() {
    this.http
      .get('http://localhost:3000/user-profile', { withCredentials: true })
      .subscribe((response) => {
        console.log(response);
      });
  }
  playlistInfo() {
    this.http
      .get('http://localhost:3000/user-playlists', { withCredentials: true })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
