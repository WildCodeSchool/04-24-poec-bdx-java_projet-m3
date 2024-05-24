import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, of, tap } from 'rxjs';
import { Student } from '../models/user';
import { UserStoreService } from './stores/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();

  constructor() {}

  activeStudentProfil$: BehaviorSubject<Student> = new BehaviorSubject<Student>(
    {} as Student
  );

  getStudentProfil() {
    return this.httpClient
      .get<Student>(
        environment.BASE_URL +
          '/student/students/' +
          this.userConnected.value?.id
      )
      .pipe(tap((res) => this.activeStudentProfil$.next(res)));
  }

  updateStudentProfil(profil: Student) {
    return this.httpClient
      .put<{
        affectedRow: number;
        profil: Student;
        success: boolean;
      }>(
        environment.BASE_URL +
          '/student/students/' +
          this.userConnected.value?.id,
        { ...profil, userId: this.userConnected.value?.id }
      )
      .pipe(tap((result) => this.activeStudentProfil$.next(result.profil)));
  }

  updateStudentImage(file: File) {
    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      return this.httpClient
        .put<{
          affectedRow: number;
          profil: Student;
          success: boolean;
        }>(
          environment.BASE_URL +
            '/student/students/image/' +
            this.userConnected.value?.id,
          formData
        )
        .pipe(tap((res) => this.activeStudentProfil$.next(res.profil)));
    } else return of();
  }
}
