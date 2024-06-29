import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Mentor, Student } from '../models/user';
import { UserStoreService } from './stores/user-store.service';
import { Formation, FormationDTO } from '../models/formation';
import { Experience, ExperienceDTO } from '../models/experience';
import { Language } from '../models/language';
import { Skill } from '../models/chip';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL_API = environment.BASE_URL_API;
  private router = inject(Router);
  private http = inject(HttpClient);
  private userStore = inject(UserStoreService);

  activeUserFormations$: BehaviorSubject<FormationDTO[]> = new BehaviorSubject(
    [] as FormationDTO[]
  );
  activeUserExperiences$: BehaviorSubject<ExperienceDTO[]> =
    new BehaviorSubject([] as ExperienceDTO[]);
  activeUserLanguages$: BehaviorSubject<Language[]> = new BehaviorSubject(
    [] as Language[]
  );
  activeUserSkills$: BehaviorSubject<Skill[]> = new BehaviorSubject(
    [] as Skill[]
  );
  isLoading$ = new BehaviorSubject<boolean>(false);

  createStudent(registerFormValues: any): Observable<Student> {
    return this.http
      .post<Student>(
        `${this.BASE_URL_API}/api/v1/auth/register/student`,
        registerFormValues
      )
      .pipe(
        map((data: Student) => {
          this.router.navigate(['']);
          return data;
        })
      );
  }

  createMentor(registerFormValues: any): Observable<Mentor> {
    return this.http
      .post<Student>(
        `${this.BASE_URL_API}/api/v1/auth/register/mentor`,
        registerFormValues
      )
      .pipe(
        map((data: Mentor) => {
          this.router.navigate(['']);
          return data;
        })
      );
  }

  getListSkills() {
    return this.http.get<Skill[]>(environment.BASE_URL_API + '/skill/get/all');
  }

  // CRUD languages

  getListLanguages() {
    return this.http.get<Language[]>(
      environment.BASE_URL_API + '/language/get/all'
    );
  }

  getUserLanguages() {
    return this.http
      .get<Language[]>(
        environment.BASE_URL_API +
          '/language/user/' +
          this.userStore.getUserConnected$().value.id
      )
      .pipe(
        tap((languages) => {
          this.activeUserLanguages$.next(languages);
        })
      );
  }

  updateUserLanguages(languages: Language[]) {
    return this.http
      .put<{ success: boolean; message: string; languages: Language[] }>(
        environment.BASE_URL_API +
          '/language/user/update/' +
          this.userStore.getUserConnected$().value?.id,
        languages
      )
      .pipe(
        tap((result) => {
          console.log('updating !!!');

          console.log(result);

          this.activeUserLanguages$.next(result.languages);
        })
      );
  }

  // CRUD Formation
  getUserFormations() {
    return this.http
      .get<FormationDTO[]>(
        environment.BASE_URL_API +
          '/formation/user/' +
          this.userStore.getUserConnected$().value.id
      )
      .pipe(tap((formations) => this.activeUserFormations$.next(formations)));
  }

  addFormationUser(formation: Formation): Observable<{
    success: string;
    message: string;
    formations: FormationDTO[];
  }> {
    return this.http
      .post<{
        success: string;
        message: string;
        formations: FormationDTO[];
      }>(environment.BASE_URL_API + '/formation/user/add', formation)
      .pipe(
        tap((response) => this.activeUserFormations$.next(response.formations))
      );
  }

  updateFormationUser(formation: FormationDTO): Observable<{
    success: string;
    affectedRows: number;
    formations: FormationDTO[];
  }> {
    console.log('formation ', formation);

    return this.http
      .put<{
        success: string;
        affectedRows: number;
        formations: FormationDTO[];
      }>(
        environment.BASE_URL_API + '/formation/user/update/' + formation.id,
        formation
      )
      .pipe(
        tap((response) => this.activeUserFormations$.next(response.formations))
      );
  }

  deleteFormationUser(formationId: number): Observable<{
    success: boolean;
    message: string;
    formations: FormationDTO[];
  }> {
    return this.http
      .delete<{
        success: boolean;
        message: string;
        formations: FormationDTO[];
      }>(environment.BASE_URL_API + '/formation/user/delete/' + formationId)
      .pipe(
        tap((response) => this.activeUserFormations$.next(response.formations))
      );
  }

  // CRUD Skill for active mentor
  getUserSkills() {
    return this.http
      .get<Skill[]>(
        environment.BASE_URL_API +
          '/skill/user/' +
          this.userStore.getUserConnected$().value.id
      )
      .pipe(tap((skills) => this.activeUserSkills$.next(skills)));
  }

  updateUserSkills(skills: Skill[]) {
    return this.http
      .put<{ success: boolean; message: string; skills: Skill[] }>(
        environment.BASE_URL_API +
          '/skill/user/update/' +
          this.userStore.getUserConnected$().value.id,
        skills
      )
      .pipe(tap((result) => this.activeUserSkills$.next(result.skills)));
  }

  getMentorSkillsById(userId: number) {
    return this.http.get<Skill[]>(
      environment.BASE_URL_API + '/skill/skills/user/' + userId
    );
  }

  // CRUD Experience
  getUserExperiences() {
    return this.http
      .get<ExperienceDTO[]>(
        environment.BASE_URL_API +
          '/experience/user/get/' +
          this.userStore.getUserConnected$().value.id
      )
      .pipe(
        tap((experiences) => this.activeUserExperiences$.next(experiences))
      );
  }

  addUserExperience(experience: Experience): Observable<{
    message: string;
    success: boolean;
    experiences: ExperienceDTO[];
  }> {
    return this.http
      .post<{
        message: string;
        success: boolean;
        experiences: ExperienceDTO[];
      }>(environment.BASE_URL_API + '/experience/user/add', {
        ...experience,
        userId: this.userStore.getUserConnected$().value.id,
      })
      .pipe(
        tap((result) => {
          this.activeUserExperiences$.next(result.experiences);
        })
      );
  }

  editExperience(
    experience: Experience,
    experienceId: number
  ): Observable<{
    affectedRows: number;
    experiences: ExperienceDTO[];
  }> {
    return this.http
      .put<{
        affectedRows: number;
        experiences: ExperienceDTO[];
      }>(environment.BASE_URL_API + '/experience/user/update/' + experienceId, {
        ...experience,
        id: experienceId,
        userId: this.userStore.getUserConnected$().value.id,
      })
      .pipe(
        tap((result) => {
          this.activeUserExperiences$.next(result.experiences);
        })
      );
  }

  deleteExperience(experienceId: number): Observable<{
    message: string;
    success: boolean;
    experiences: ExperienceDTO[];
  }> {
    return this.http
      .delete<{
        message: string;
        success: boolean;
        experiences: ExperienceDTO[];
      }>(environment.BASE_URL_API + '/experience/user/delete/' + experienceId)
      .pipe(
        tap((res) => {
          console.log('deleting res ', res);

          this.activeUserExperiences$.next(res.experiences);
        })
      );
  }
}
