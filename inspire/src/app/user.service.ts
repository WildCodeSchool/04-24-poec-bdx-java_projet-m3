import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
} from 'rxjs';
import {
  LoginDTO,
  Mentor,
  MentorDTO,
  Student,
  User,
  UserDTO,
} from './shared/models/user';
import { UserStoreService } from './shared/services/stores/user-store.service';
import { Router } from '@angular/router';
import { Skill } from './shared/models/chip';
import { Language } from './shared/models/language';
import { Experience, ExperienceDTO } from './shared/models/experience';
import { Formation, FormationDTO } from './shared/models/formation';
import { environment } from '../environments/environment.development';
import { BroadcastMessage } from './shared/models/broadcastMessage';

type InscriptionUser = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};
import { cp } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL_API = 'http://localhost:8080';
  private readonly BASE_URL = 'http://localhost:3310';
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

  getUserByToken(token: string): Observable<UserDTO> {
    this.userStore.token$.next(token);
    return this.http.get<UserDTO>(`${this.BASE_URL_API}/api/v1/users/me`).pipe(
      tap((user) => {
        this.userStore.setUserConnected(user);
      })
    );
  }

  login(email: string, password: string): Observable<UserDTO | null> {
    const user = { email, password } as LoginDTO;
    return this.http
      .post<any>(`${this.BASE_URL_API}/api/v1/auth/authenticate `, user)
      .pipe(
        tap((users) => {
          if (users) {
            const user = users;
            this.userStore.setUserConnected(user);
            this.userStore.token$.next(user.token);
            window.localStorage.setItem('token', user.token);
            this.publish({
              type: 'login',
              payload: this.userStore.getUserConnected$().value,
            });
            console.log('user', user);

            if (user.role === 'MENTOR') {
              this.router.navigate(['/mentor']);
            }
            if (user.role === 'STUDENT') {
              this.router.navigate(['/student']);
            }
          } else {
            alert('Identifiants incorrects');
          }
        })
      );
  }

  loginTabs(message: BroadcastMessage) {
    if (message) {
      this.userStore.setUserConnected(message.payload as UserDTO);
      if (message.payload.role === 'MENTOR') this.router.navigate(['/mentor']);
      if (message.payload.role === 'STUDENT')
        this.router.navigate(['/student']);
    }
  }

  logout() {
    const user = this.userStore.getUserConnected$().value;

    if (user && (user.email || user.token)) {
      localStorage.removeItem('token');
      this.userStore.setUserConnected({} as UserDTO);
      this.userStore.token$.next('');
      this.router.navigate(['']);
      this.publish({ type: 'logout' } as BroadcastMessage);
    } else {
      console.log('No valid user data found, aborting logout');
    }
  }

  getListSkills() {
    // return this.http.get<Skill[]>(`${this.BASE_URL}/skill/skills`);
    return this.http.get<Skill[]>(`http://localhost:8080/skill/get/all`);
  }

  // CRUD languages

  getListLanguages() {
    // return this.http.get<Language[]>(`${this.BASE_URL}/language/languages`);
    return this.http.get<Language[]>(`http://localhost:8080/language/get/all`);
  }

  getUserLanguages() {
    return (
      this.http
        // .get<Language[]>(
        //   environment.BASE_URL +
        //     '/language/languages/user/' +
        //     this.userStore.getUserConnected$().value?.id
        // )
        .get<Language[]>(
          'http://localhost:8080/language/user/' +
            this.userStore.getUserConnected$().value.id
        )
        .pipe(
          tap((languages) => {
            this.activeUserLanguages$.next(languages);
          })
        )
    );
  }

  updateUserLanguages(languages: Language[]) {
    return this.http
      .put<{ success: boolean; message: string; languages: Language[] }>(
        'http://localhost:8080/language/user/update/' +
          this.userStore.getUserConnected$().value?.id,
        languages
        // environment.BASE_URL +
        //   '/language/languages/user/' +
        //   this.userStore.getUserConnected$().value?.id,
        // languages
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
        // environment.BASE_URL +
        //   '/formation/formations/user/' +
        'http://localhost:8080/formation/user/' +
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
      }>(
        `http://localhost:8080/formation/user/add`,
        //`${environment.BASE_URL}/formation/formations/`
        formation
      )
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
        `http://localhost:8080/formation/user/update/` + formation.id,
        //${environment.BASE_URL}/formation/formations/${formation.id}`,
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
      }>(`http://localhost:8080/formation/user/delete/` + formationId)
      .pipe(
        tap((response) => this.activeUserFormations$.next(response.formations))
      );
  }

  // CRUD Skill for active mentor
  getUserSkills() {
    return this.http
      .get<Skill[]>(
        // environment.BASE_URL +
        //   '/skill/skills/user/' +
        'http://localhost:8080/skill/user/' +
          this.userStore.getUserConnected$().value.id
      )
      .pipe(tap((skills) => this.activeUserSkills$.next(skills)));
  }

  updateUserSkills(skills: Skill[]) {
    return this.http
      .put<{ success: boolean; message: string; skills: Skill[] }>(
        // environment.BASE_URL +
        // '/skill/skills/user/' +
        'http://localhost:8080/skill/user/update/' +
          this.userStore.getUserConnected$().value.id,
        skills
      )
      .pipe(tap((result) => this.activeUserSkills$.next(result.skills)));
  }

  getMentorSkillsById(userId: number) {
    return this.http.get<Skill[]>(
      environment.BASE_URL + '/skill/skills/user/' + userId
    );
  }

  // CRUD Experience
  getUserExperiences() {
    return this.http
      .get<ExperienceDTO[]>(
        //  environment.BASE_URL +
        // '/experience/experiences/user/' +
        'http://localhost:8080/experience/user/' +
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
      }>('http://localhost:8080/experience/user/add', {
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
      }>(
        'http://localhost:8080/experience/user/update/' + experienceId,
        // `${this.BASE_URL}/experience/experiences/${experienceId}`,
        {
          ...experience,
          id: experienceId,
          userId: this.userStore.getUserConnected$().value.id,
        }
      )
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
      }>(
        'http://localhost:8080/experience/user/delete/' + experienceId
        // `${this.BASE_URL}/experience/experiences/${experienceId}/${
        // this.userStore.getUserConnected$().value?.id
        // }`
      )
      .pipe(
        tap((res) => {
          console.log('deleting res ', res);

          this.activeUserExperiences$.next(res.experiences);
        })
      );
  }

  // Tabs communication

  onMessage = new Subject();
  broadcastChannel = new BroadcastChannel('logout');

  constructor() {
    this.broadcastChannel.onmessage = (
      message: MessageEvent<BroadcastMessage>
    ) => {
      if (message.data.type === 'logout') {
        this.logout();
      }
      if (message.data.type === 'login') {
        //this.logout();
        this.loginTabs(message.data);
      }
    };
  }

  publish(message: BroadcastMessage): void {
    this.broadcastChannel.postMessage(message);
  }
}
