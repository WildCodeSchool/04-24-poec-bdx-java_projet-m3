import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStoreService } from './shared/services/stores/user-store.service';
import { User } from './shared/models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | undefined;
  userDansLeLocalStorage: User | null = null;

  constructor(private store: UserStoreService) {}

  ngOnInit(): void {
    this.userSubscription = this.store.getUserConnected$().subscribe((user) => {
      this.userDansLeLocalStorage = user;
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.store.setUserConnected(user);
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
