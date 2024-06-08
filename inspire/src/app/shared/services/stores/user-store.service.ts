import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private userConnected$: BehaviorSubject<UserDTO> =
    new BehaviorSubject<UserDTO>({} as UserDTO);

  token$: BehaviorSubject<string> = new BehaviorSubject(
    'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibWVudG9yIiwic3ViIjoibWVudG9yMUBnbWFpbC5jb20iLCJpYXQiOjE3MTc4NTI3OTYsImV4cCI6MTcxNzg4ODc5Nn0.Q3ZuzyrzAj8UlKk1gL6apIM4Z0XofBdtdL5eYO5vz0c'
  );

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
