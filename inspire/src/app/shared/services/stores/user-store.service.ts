import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userConnected$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor() {
    const storedUser = localStorage.getItem('user');
    this.userConnected$ = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
  }

  getUserConnected$(): BehaviorSubject<User | null> {
    return this.userConnected$;
  }

  setUserConnected(user: User | null): void {
    this.userConnected$.next(user);
  }

  getUserId(): number | null {
    return this.userConnected$.value?.id ?? null;
  }
}
