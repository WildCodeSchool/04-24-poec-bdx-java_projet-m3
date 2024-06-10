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
    'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoibWVudG9yIiwic3ViIjoibWVudG9yMUBnbWFpbC5jb20iLCJpYXQiOjE3MTc5MzA3MTksImV4cCI6MTcxNzIzNTc1Mn0.Q1QZIlIXjHf_uPkh1f0vCR2P5KJuixfOBp8M7LOdXsU'
  );

  getUserConnected$(): BehaviorSubject<any> {
    return this.userConnected$;
  }

  setUserConnected(user: UserDTO): void {
    this.userConnected$.next(user);
  }

  getUserId(): number {
    return this.userConnected$.value?.id ?? null;
  }
}
