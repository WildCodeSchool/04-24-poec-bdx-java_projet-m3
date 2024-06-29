import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userConnected$: BehaviorSubject<UserDTO> =
    new BehaviorSubject<UserDTO>({} as UserDTO);

  token$: BehaviorSubject<string> = new BehaviorSubject('');

  getUserConnected$(): BehaviorSubject<UserDTO> {
    return this.userConnected$;
  }

  setUserConnected(user: UserDTO): void {
    this.userConnected$.next(user);
  }

  getUserId(): number {
    return this.userConnected$.value?.id ?? null;
  }
}
