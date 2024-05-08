import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first, map, switchMap, tap } from 'rxjs';
import { Mentor, Student, User } from './shared/models/user';
import { UserStoreService } from './shared/services/stores/user-store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:3000';
  private router = inject(Router);
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
      }),
      map((data) => {
        this.router.navigate(['']);
        return data;
      })
    );
  }

  createMentor(registerFormValues: any): Observable<Mentor> {
    const user: User = new User(
      registerFormValues.email,
      registerFormValues.password,
      'mentor'
    );

    return this.createUser(user).pipe(
      switchMap((createdUser: User) => {
        const userId = createdUser.id as string;
        const mentor: Mentor = new Mentor(
          userId,
          registerFormValues.firstName,
          registerFormValues.lastName,
          '',
          '',
          '',
          '',
          ''
        );

        return this.http.post<Mentor>(`${this.BASE_URL}/mentors`, mentor);
      }),
      map((data) => {
        this.router.navigate(['']);
        return data;
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
            const userString = JSON.stringify(user);
            window.localStorage.setItem('user', userString);
            console.log(user);
            if (user.role === 'mentor') this.router.navigate(['/mentor']);
            if (user.role === 'student') this.router.navigate(['/student']);
            return user;
          } else {
            alert('Identifiants incorrects');
            return null;
          }
        })
      );
  }
}
