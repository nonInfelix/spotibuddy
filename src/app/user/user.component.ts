import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SUser } from '../../interfaces/spotify-interface';
import { ActivatedRoute } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonModule, AvatarGroupModule, AvatarModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user!: SUser;
  isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // init wird nach login() noch mal aufgerufen
    this.route.queryParams.subscribe((params) => {
      if (params['log'] === '1') {
        this.getUser();
      }
    });
    this.getUser();
  }

  login() {
    window.location.href = 'https://spotibuddy.onrender.com//auth';
  }
  getUser() {
    this.auth.userInfo().subscribe((res: SUser) => {
      console.log(res);
      this.user = res;
      this.isLoggedIn = true;
    });
  }
}
