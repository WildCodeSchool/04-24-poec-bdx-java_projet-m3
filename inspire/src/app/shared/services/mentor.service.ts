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

  constructor() {}

  activeMentor$: BehaviorSubject<MentorFullProfil> = new BehaviorSubject(
    {} as MentorFullProfil
  );

  getMentorById(id: string) {
    return this.httpClient
      .get<Mentor[]>(environment.BASE_URL + '/mentor/mentors/2') // + id)
      .pipe(map((res) => res[0]))
      .pipe(
        switchMap((res) => {
          const skills = this.httpClient
            .get<ResponseSkill[]>(
              environment.BASE_URL +
                '/skillUsers?userId=' +
                res.userId +
                '&_embed=skill'
            )
            .pipe(map((response) => response.map((ele) => ele.skill)));

          const languages = this.httpClient
            .get<ResponseLanguage[]>(
              environment.BASE_URL +
                '/userLanguages?userId=' +
                res.userId +
                '&_embed=language'
            )
            .pipe(map((response) => response.map((ele) => ele.language)));

          const formations = this.httpClient.get<Formation[]>(
            environment.BASE_URL + '/formations?userId=' + res.userId
          );

          const experiences = this.httpClient.get<Experience[]>(
            environment.BASE_URL + '/experiences?userId=' + res.userId
          );

          return forkJoin({
            profil: of(res),
            languages,
            skills,
            experiences,
            formations,
          });
        }),
        tap((res) => {
          console.log('fork joined results ', res);
          this.activeMentor$.next(res);
        })
      );
  }

  getMentorByIdBackUp(id: string) {
    return this.httpClient
      .get<Mentor[]>(environment.BASE_URL + '/mentors?userId=' + id)
      .pipe(map((res) => res[0]));
  }

  getMentorSkills(id: string) {
    console.log('userId ', id);

    return this.httpClient
      .get<ResponseSkill[]>(
        environment.BASE_URL + '/skillUsers?userId=' + id + '&_embed=skill'
      )
      .pipe(map((response) => response.map((ele) => ele.skill)));
  }

  getMentorLanguages(id: string) {
    console.log('userId ', id);

    return this.httpClient
      .get<ResponseLanguage[]>(
        environment.BASE_URL +
          '/userLanguages?userId=' +
          id +
          '&_embed=language'
      )
      .pipe(map((response) => response.map((ele) => ele.language)));
  }
}
