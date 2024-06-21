import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, of, tap } from 'rxjs';
import { Student, StudentDTO } from '../models/user';
import { UserStoreService } from './stores/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();

  constructor() {}

  activeStudentProfil$: BehaviorSubject<StudentDTO> =
    new BehaviorSubject<StudentDTO>({} as StudentDTO);

  getStudentProfil() {
    return this.httpClient
      .get<StudentDTO>(
        'http://localhost:8080/student/' + this.userConnected.value.id
        // environment.BASE_URL_API + 'api/v1/users/me'
      )
      .pipe(
        tap((res) => {
          this.activeStudentProfil$.next(res);
        })
      );
  }

  updateStudentProfil(profil: StudentDTO) {
    return this.httpClient
      .put<StudentDTO>(
        'http://localhost:8080/student/' + this.userConnected.value.id,
        // environment.BASE_URL +
        //   '/student/students/' +
        //   this.userConnected.value?.id,
        { ...profil, userId: this.userConnected.value?.id }
      )
      .pipe(tap((result) => this.activeStudentProfil$.next(profil)));
  }

  updateStudentImage(file: File) {
    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      return this.httpClient
        .post<StudentDTO>(
          // environment.BASE_URL +
          // '/student/students/image/' +
          'http://localhost:8080/user/upload/image/student/' +
            this.userConnected.value?.id,
          formData
        )
        .pipe(tap((res) => this.activeStudentProfil$.next(res)));
    } else return of();
  }
}
