import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userConnected$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  getUserConnected$(): BehaviorSubject<User | null> {
    return this.userConnected$;
  }

  setUserConnected(user: User | null): void {
    this.userConnected$.next(user);
  }
}
