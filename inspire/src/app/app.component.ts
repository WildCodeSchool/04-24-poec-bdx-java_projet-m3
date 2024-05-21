import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from './shared/models/user';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined;
  userDansLeLocalStorage: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: any = JSON.parse(storedUser);
      const token = user.token;
      this.userService.getUserByToken(token).subscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
