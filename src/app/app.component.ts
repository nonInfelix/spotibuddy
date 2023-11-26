import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spotify-converter';

  constructor(private auth: AuthService) {}

  login() {
    // this.auth.getToken().subscribe((token) => {
    //  this.token = token;});
    window.location.href = 'http://localhost:3000/auth';
  }
  getUser() {
    this.auth.userInfo();
  }
  getPlaylists() {
    this.auth.playlistInfo();
  }
}
