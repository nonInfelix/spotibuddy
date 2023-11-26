import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { SUser } from '../../interfaces/spotify-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user!: SUser;

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // init wird nach login() noch mal aufgerufen
    this.route.queryParams.subscribe((params) => {
      if (params['log'] === '1') {
        this.getUser();
      }
    });
  }

  login() {
    window.location.href = 'http://localhost:3000/auth';
  }
  getUser() {
    this.auth.userInfo().subscribe((res: SUser) => {
      console.log(res);
      this.user = res;
    });
  }
}
