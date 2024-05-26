import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserDTO } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userConnected$: BehaviorSubject<UserDTO> =
    new BehaviorSubject<UserDTO>({} as UserDTO);

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
