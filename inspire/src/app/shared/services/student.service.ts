
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  BehaviorSubject,
  forkJoin,
  of,
  switchMap,
  tap,
} from 'rxjs';
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

  activeStudent$: BehaviorSubject<StudentFullProfil> = new BehaviorSubject(
    {} as StudentFullProfil
  );

  getStudentById() {
    console.log('connected user value', this.userConnected.value);

    return this.httpClient
      .get<Student>(
        environment.BASE_URL + '/student/students/' + this.userConnected.value?.id
      )
      .pipe(
        switchMap((ele) => {
          const listSkills = this.getStudentSkills();
          const listLanguages = this.getStudentLanguages();
          const listFormations = this.getStudentFormations();
          const listExperiences = this.getStudentExperiences();
          return forkJoin({
            profil: of(ele),
            languages: listLanguages,
            skills: listSkills,
            formations: listFormations,
            experiences: listExperiences,
          });
        })
      )
      .pipe(tap((fullProfil) => this.activeStudent$.next(fullProfil)));
  }

  getStudentSkills() {
    return this.httpClient
      .get<Skill[]>(
        environment.BASE_URL +
          '/skill/skills/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((ele) => console.log('skills', ele)));
  }

  getStudentSkillsById(userId: number) {
    return this.httpClient
      .get<Skill[]>(`${
        environment.BASE_URL}/skill/skills/user/${userId}`
      )
      .pipe(tap((ele) => console.log('skills', ele)));
  }

  getStudentLanguages() {
    return this.httpClient
      .get<Language[]>(
        environment.BASE_URL +
          '/language/languages/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((ele) => console.log('languages', ele)));
  }

  getStudentFormations() {
    return this.httpClient
      .get<Formation[]>(
        environment.BASE_URL +
          '/formation/formations/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((ele) => console.log('languages', ele)));
  }
  getStudentExperiences() {
    return this.httpClient
      .get<Experience[]>(
        environment.BASE_URL +
          '/experience/experiences/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((ele) => console.log('les experiences', ele)));
  }

  updateStudentLanguagesList(languages: Language[]) {
    return this.httpClient
      .post<{ success: boolean; message: string }>(
        environment.BASE_URL +
          '/language/languages/user/' +
          this.userConnected.value?.id,
        languages
      )
      .pipe(tap((ele) => console.log('languages new list', ele)));
  }
}
