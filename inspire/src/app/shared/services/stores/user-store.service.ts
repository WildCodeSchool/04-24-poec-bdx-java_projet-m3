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
    'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiTUVOVE9SIiwic3ViIjoibWVudG9yMUBnbWFpbC5jb20iLCJpYXQiOjE3MTgwMjMyMjMsImV4cCI6MTcxNzMyODI1NX0.3ySg4awLkuY_rvwX7tDXkclc7OSIvfO_MSGJmFIZX04'
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
