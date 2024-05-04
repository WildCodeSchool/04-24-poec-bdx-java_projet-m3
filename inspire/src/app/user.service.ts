import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, map, switchMap, tap } from 'rxjs';
import { Student, User } from './shared/models/user';
import { UserStoreService } from './shared/services/stores/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:3000';
  private http = inject(HttpClient);
  private userStore = inject(UserStoreService);
  constructor() {}

  private createUser(user: User): Observable<User> {
    if (user.id) {
      delete user.id;
    }
    return this.http.post<User>(`${this.BASE_URL}/users`, user);
  }

  createStudent(registerFormValues: any): Observable<Student> {
    const user: User = new User(
      registerFormValues.email,
      registerFormValues.password,
      'student'
    );

    return this.createUser(user).pipe(
      switchMap((createdUser: User) => {
        const userId = createdUser.id as string;
        console.log(createdUser);

        const student: Student = new Student(
          userId,
          registerFormValues.firstName,
          registerFormValues.lastName,
          '',
          '',
          '',
          '',
          ''
        );

        return this.http.post<Student>(`${this.BASE_URL}/students`, student);
      })
    );
  }

  login(email: any, password: any): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.BASE_URL}/users?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users[0]) {
            const user = users[0];
            this.userStore.setUserConnected(user);
            console.log(user);
            return user;
          } else {
            console.log('pas de user');
            return null;
          }
        })
      );
  }
}
