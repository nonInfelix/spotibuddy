import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SUser } from '../../interfaces/spotify-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  tokenObj!: {};

  getToken() {
    return this.http.get('http://localhost:3000/auth');
  }

  userInfo(): Observable<SUser> {
    return this.http.get<SUser>('http://localhost:3000/user-profile', {
      withCredentials: true,
    });
  }
}
