import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  constructor() {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/user`, user);
  }
}
