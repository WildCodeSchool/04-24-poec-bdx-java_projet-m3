import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, forkJoin, of, switchMap, tap } from 'rxjs';
import { Student, StudentFullProfil } from '../models/user';
import { Skill } from '../models/chip';
import { Language } from '../models/language';
import { Formation } from '../models/formation';
import { Experience } from '../models/experience';
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

  updateMentorProfil(profil: Student) {
    return this.httpClient.put<{
      affectedRow: number;
      profil: Student;
      success: boolean;
    }>(
      environment.BASE_URL + '/mentor/mentors/' + this.userConnected.value?.id,
      { ...profil, userId: this.userConnected.value?.id }
    );
  }
}
