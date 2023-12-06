import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist-confirm.component.html',
  styleUrl: './playlist-confirm.component.scss',
})
export class PlaylistConfirmComponent implements OnInit {
  timer: number = 10;
  constructor(private router: Router) {}

  ngOnInit(): void {
    /*
    setTimeout(() => this.router.navigate(['']), 10000);
    setInterval(() => (this.timer -= 1), 1000);
    */
  }
}
