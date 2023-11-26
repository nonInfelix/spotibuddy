import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SUser } from '../../interfaces/spotify-interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user!: SUser;

  constructor(private auth: AuthService) {}

  login() {
    window.location.href = 'http://localhost:3000/auth';
    //check cookie
  }
  getUser() {
    this.auth.userInfo().subscribe((res: SUser) => {
      console.log(res);
      this.user = res;
    });
  }
}
