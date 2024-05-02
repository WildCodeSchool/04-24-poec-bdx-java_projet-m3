import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Student, User } from './shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  constructor() {}

  private createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/user`, user);
  }

  createStudent(registerFormValues: any): Observable<Student> {
    const user: User = new User(
      registerFormValues.email,
      registerFormValues.password,
      'student'
    );

    return this.createUser(user).pipe(
      switchMap((createdUser: User) => {
        const userId = createdUser.id;
        const student: Student = new Student(
          user.email,
          user.password,
          user.role,
          registerFormValues.firstName,
          registerFormValues.lastName,
          registerFormValues.description
        );

        return this.http.post<Student>(`${this.BASE_URL}/student`, student);
      })
    );
  }
}
