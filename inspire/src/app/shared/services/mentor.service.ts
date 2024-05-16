import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  BehaviorSubject,
  Observable,
  forkJoin,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Mentor, MentorFullProfil } from '../models/user';
import { Skill } from '../models/chip';
import { Language } from '../models/language';
import { Formation } from '../models/formation';
import { Experience } from '../models/experience';
import { UserStoreService } from './stores/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();

  constructor() {}

  activeMentorProfil$: BehaviorSubject<Mentor> = new BehaviorSubject(
    {} as Mentor
  );
  activeMentorFormations$: BehaviorSubject<Formation[]> = new BehaviorSubject(
    [] as Formation[]
  );
  activeMentorExperiences$: BehaviorSubject<Experience[]> = new BehaviorSubject(
    [] as Experience[]
  );
  activeMentorLanguages$: BehaviorSubject<Language[]> = new BehaviorSubject(
    [] as Language[]
  );
  activeMentorSkills$: BehaviorSubject<Skill[]> = new BehaviorSubject(
    [] as Skill[]
  );

  getFullMentorProfil() {
    this.getMentorFormations().pipe(take(1)).subscribe();
    this.getMentorSkills().pipe(take(1)).subscribe();
    this.getMentorLanguages().pipe(take(1)).subscribe();
    this.getMentorExperiences().pipe(take(1)).subscribe();
  }

  getMentorProfil() {
    return this.httpClient.get<Mentor>(
      environment.BASE_URL + '/mentor/mentors/' + this.userConnected.value?.id
    );
  }

  getMentorSkills() {
    return this.httpClient
      .get<Skill[]>(
        environment.BASE_URL +
          '/skill/skills/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((skills) => this.activeMentorSkills$.next(skills)));
  }

  getMentorSkillsById(userId: number) {
    return this.httpClient.get<Skill[]>(
      `${environment.BASE_URL}/skill/skills/user/${userId}`
    );
  }

  getMentorLanguages() {
    return this.httpClient
      .get<Language[]>(
        environment.BASE_URL +
          '/language/languages/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((languages) => this.activeMentorLanguages$.next(languages)));
  }

  getMentorFormations() {
    return this.httpClient
      .get<Formation[]>(
        environment.BASE_URL +
          '/formation/formations/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((formations) => this.activeMentorFormations$.next(formations)));
  }

  getMentorExperiences() {
    return this.httpClient
      .get<Experience[]>(
        environment.BASE_URL +
          '/experience/experiences/user/' +
          this.userConnected.value?.id
      )
      .pipe(
        tap((experiences) => this.activeMentorExperiences$.next(experiences))
      );
  }

  updateMentorLanguagesList(languages: Language[]) {
    return this.httpClient
      .post<{ success: boolean; message: string; languages: Language[] }>(
        environment.BASE_URL +
          '/language/languages/user/' +
          this.userConnected.value?.id,
        languages
      )
      .pipe(
        tap((result) => this.activeMentorLanguages$.next(result.languages))
      );
  }

  addFormationMentor(formation: Formation): Observable<{
    success: string;
    message: string;
    formations: Formation[];
  }> {
    return this.httpClient
      .post<{
        success: string;
        message: string;
        formations: Formation[];
      }>(`${environment.BASE_URL}/formation/formations/`, formation)
      .pipe(tap((ele) => this.activeMentorFormations$.next(ele.formations)));
  }

  updateFormationMentor(formation: Formation): Observable<{
    success: string;
    affectedRows: number;
    formations: Formation[];
  }> {
    return this.httpClient
      .put<{
        success: string;
        affectedRows: number;
        formations: Formation[];
      }>(
        `${environment.BASE_URL}/formation/formations/${formation.id}`,
        formation
      )
      .pipe(
        tap((result) => this.activeMentorFormations$.next(result.formations))
      );
  }

  deleteFormationMentor(formationId: number): Observable<{
    success: string;
    message: string;
    formations: Formation[];
  }> {
    return this.httpClient
      .delete<{
        success: string;
        message: string;
        formations: Formation[];
      }>(
        `${environment.BASE_URL}/formation/formations/${formationId}/${this.userConnected.value?.id}`
      )
      .pipe(
        tap((result) => this.activeMentorFormations$.next(result.formations))
      );
  }
}
