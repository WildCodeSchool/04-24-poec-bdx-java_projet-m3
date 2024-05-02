import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, map, switchMap, tap } from 'rxjs';
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

  login(email: any, password: any): Observable<any> {
    return this.http
      .get<any>(`${this.BASE_URL}/users?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users[0]) {
            const user = users[0];
            delete user.password;
            console.log(user);
            return true;
          } else {
            console.log('pas de user');
            return false;
          }
        })
      );
  }
}
