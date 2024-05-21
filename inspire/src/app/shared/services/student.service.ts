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

  activeStudent$: BehaviorSubject<StudentFullProfil> = new BehaviorSubject(
    {} as StudentFullProfil
  );

  getStudentById() {
    return this.httpClient
      .get<Student>(
        environment.BASE_URL +
          '/student/students/' +
          this.userConnected.value?.id
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
    return this.httpClient.get<Skill[]>(
      environment.BASE_URL +
        '/skill/skills/user/' +
        this.userConnected.value?.id
    );
  }

  getStudentSkillsById(userId: number) {
    return this.httpClient.get<Skill[]>(
      `${environment.BASE_URL}/skill/skills/user/${userId}`
    );
  }

  getStudentLanguages() {
    return this.httpClient.get<Language[]>(
      environment.BASE_URL +
        '/language/languages/user/' +
        this.userConnected.value?.id
    );
  }

  getStudentFormations() {
    return this.httpClient.get<Formation[]>(
      environment.BASE_URL +
        '/formation/formations/user/' +
        this.userConnected.value?.id
    );
  }
  getStudentExperiences() {
    return this.httpClient.get<Experience[]>(
      environment.BASE_URL +
        '/experience/experiences/user/' +
        this.userConnected.value?.id
    );
  }

  updateStudentLanguagesList(languages: Language[]) {
    return this.httpClient.post<{ success: boolean; message: string }>(
      environment.BASE_URL +
        '/language/languages/user/' +
        this.userConnected.value?.id,
      languages
    );
  }
}
