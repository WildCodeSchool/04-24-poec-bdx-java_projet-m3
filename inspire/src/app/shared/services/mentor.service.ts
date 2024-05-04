import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { Mentor } from '../models/user';
import { Skill } from '../models/chip';

type ResponseSkill = {
  id: string;
  userId: string;
  skillId: string;
  skill: Skill;
};

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  httpClient = inject(HttpClient);

  constructor() {}

  activeMentor$: BehaviorSubject<Mentor> = new BehaviorSubject({} as Mentor);

  getMentorById(id: string) {
    return this.httpClient
      .get<Mentor[]>(environment.BASE_URL + '/mentors?userId=' + id)
      .pipe(map((res) => res[0]))
      .pipe(
        tap((res) => {
          this.activeMentor$.next(res);
        })
      );
  }

  getMentorSkills(id: string) {
    console.log('userId ', id);

    return this.httpClient
      .get<ResponseSkill[]>(
        environment.BASE_URL + '/skillUsers?userId=' + id + '&_embed=skill'
      )
      .pipe(map((response) => response.map((ele) => ele.skill)));
  }
}
