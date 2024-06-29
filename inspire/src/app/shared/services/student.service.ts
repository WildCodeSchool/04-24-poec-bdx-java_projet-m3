import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, of, tap } from 'rxjs';
import { StudentDTO } from '../models/user';
import { UserStoreService } from './stores/user-store.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();
  loading$ = inject(UserService).isLoading$;

  constructor() {}

  activeStudentProfil$: BehaviorSubject<StudentDTO> =
    new BehaviorSubject<StudentDTO>({} as StudentDTO);

  getStudentProfil() {
    return this.httpClient
      .get<StudentDTO>(
        environment.BASE_URL_API + '/student/' + this.userConnected.value.id
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
        environment.BASE_URL_API + '/student/' + this.userConnected.value.id,
        { ...profil, userId: this.userConnected.value?.id }
      )
      .pipe(tap(() => this.activeStudentProfil$.next(profil)));
  }

  updateStudentImage(file: File) {
    if (file) {
      const formData = new FormData();
      this.loading$.next(true);
      formData.append('file', file);

      return this.httpClient
        .post<StudentDTO>(
          environment.BASE_URL_API +
            '/user/upload/image/student/' +
            this.userConnected.value?.id,
          formData
        )
        .pipe(
          tap((res) => {
            this.activeStudentProfil$.next(res);
            this.loading$.next(false);
          })
        );
    } else return of();
  }
}
