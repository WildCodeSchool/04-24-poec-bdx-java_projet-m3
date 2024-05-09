import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  BehaviorSubject,
  Observable,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Mentor, MentorFullProfil } from '../models/user';
import { Skill } from '../models/chip';
import { Language } from '../models/language';
import { Formation } from '../models/formation';
import { Experience } from '../models/experience';
import { UserStoreService } from './stores/user-store.service';

type ResponseSkill = {
  id: string;
  userId: string;
  skillId: string;
  skill: Skill;
};

type ResponseLanguage = {
  id: string;
  userId: string;
  skillId: string;
  language: Language;
};

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();

  constructor() {}

  activeMentor$: BehaviorSubject<MentorFullProfil> = new BehaviorSubject(
    {} as MentorFullProfil
  );

  getMentorById() {
    console.log('connected user value', this.userConnected.value);

    return this.httpClient
      .get<Mentor>(
        environment.BASE_URL + '/mentor/mentors/' + this.userConnected.value?.id
      )
      .pipe(
        switchMap((ele) => {
          const listSkills = this.getMentorSkills();
          const listLanguages = this.getMentorLanguages();
          return forkJoin({
            profil: of(ele),
            languages: listLanguages,
            skills: listSkills,
            formations: of([] as Formation[]),
            experiences: of([] as Experience[]),
          });
        })
      )
      .pipe(tap((fullProfil) => this.activeMentor$.next(fullProfil)));
  }

  getMentorSkills() {
    return this.httpClient
      .get<Skill[]>(
        environment.BASE_URL +
          '/skill/skills/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((ele) => console.log('skills', ele)));
  }

  getMentorLanguages() {
    return this.httpClient
      .get<Language[]>(
        environment.BASE_URL +
          '/language/languages/user/' +
          this.userConnected.value?.id
      )
      .pipe(tap((ele) => console.log('languages', ele)));
  }
}
