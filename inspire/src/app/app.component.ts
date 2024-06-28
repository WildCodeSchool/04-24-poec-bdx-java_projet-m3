import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './shared/models/user';
import { Subscription } from 'rxjs';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined;
  userDansLeLocalStorage!: User;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loginService.getUserByToken(token).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
