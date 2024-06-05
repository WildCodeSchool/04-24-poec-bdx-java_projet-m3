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
  Mentor,
  MentorDTO,
  Student,
  StudentDTO,
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

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  private createUser(user: User): Observable<{ userId: number }> {
    return this.http.post<{ userId: number }>(`${this.BASE_URL}/users`, user);
  }

  createStudent(registerFormValues: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<Student> {
    const user: User = new User(
      registerFormValues.email,
      registerFormValues.password,
      'student'
    );

    return this.createUser(user).pipe(
      switchMap((createdUser: { userId: number }) => {
        console.log('created user ', createdUser);

        const userId = createdUser.userId;

        const student: Student = new Student(
          userId,
          registerFormValues.firstName,
          registerFormValues.lastName,
          '',
          '',
          '',
          '',
          ''
        );

        return this.http.post<Student>(
          `${this.BASE_URL}/student/students`,
          student
        );
      }),
      map((data) => {
        this.router.navigate(['']);
        return data;
      })
    );
  }

  createMentor(registerFormValues: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Observable<Mentor> {
    const user: User = new User(
      registerFormValues.email,
      registerFormValues.password,
      'mentor'
    );

    return this.createUser(user).pipe(
      switchMap((createdUser: { userId: number }) => {
        const userId = createdUser.userId;
        const mentor: Mentor = new Mentor(
          userId,
          registerFormValues.firstName,
          registerFormValues.lastName,
          '',
          '',
          '',
          '',
          ''
        );

        return this.http.post<MentorDTO>(
          `${this.BASE_URL}/mentor/mentors`,
          mentor
        );
      }),
      map((data) => {
        this.router.navigate(['']);
        return data;
      })
    );
  }

  getUserByToken(token: string): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.BASE_URL}/users/me`, { token }).pipe(
      map((user) => {
        const userString = JSON.stringify(user);
        window.localStorage.setItem('user', userString);
        this.userStore.setUserConnected(user);
        return user;
      })
    );
  }

  login(email: string, password: string): Observable<UserDTO | null> {
    return this.http
      .get<UserDTO>(`${this.BASE_URL}/users/${email}/${password}`)

      .pipe(
        map((users) => {
          if (users) {
            const user = users;
            this.userStore.setUserConnected(user);
            const userString = JSON.stringify(user);
            window.localStorage.setItem('user', userString);
            this.publish({
              type: 'login',
              payload: this.userStore.getUserConnected$().value,
            });
            if (user.role === 'mentor') this.router.navigate(['/mentor']);
            if (user.role === 'student') this.router.navigate(['/student']);
            return user;
          } else {
            alert('Identifiants incorrects');
            return null;
          }
        })
      );
  }

  loginTabs(message: BroadcastMessage) {
    if (message) {
      this.userStore.setUserConnected(message.payload as UserDTO);
      if (message.payload.role === 'mentor') this.router.navigate(['/mentor']);
      if (message.payload.role === 'student')
        this.router.navigate(['/student']);
    }
  }

  logout() {
    if (this.userStore.getUserConnected$().value.email) {
      localStorage.removeItem('user');
      this.userStore.setUserConnected({} as UserDTO);
      this.publish({ type: 'logout' } as BroadcastMessage);
      this.router.navigate(['']);
    }
  }

  getListSkills() {
    return this.http.get<Skill[]>(`${this.BASE_URL}/skill/skills`);
  }

  // CRUD languages

  getListLanguages() {
    return this.http.get<Language[]>(`${this.BASE_URL}/language/languages`);
  }

  getUserLanguages() {
    return this.http
      .get<Language[]>(
        environment.BASE_URL +
          '/language/languages/user/' +
          this.userStore.getUserConnected$().value?.id
      )
      .pipe(
        tap((languages) => {
          this.activeUserLanguages$.next(languages);
        })
      );
  }

  updateUserLanguages(languages: Language[]) {
    return this.http
      .post<{ success: boolean; message: string; languages: Language[] }>(
        environment.BASE_URL +
          '/language/languages/user/' +
          this.userStore.getUserConnected$().value?.id,
        languages
      )
      .pipe(
        tap((result) => {
          this.activeUserLanguages$.next(result.languages);
        })
      );
  }

  // CRUD Formation
  getUserFormations() {
    return this.http
      .get<FormationDTO[]>(
        environment.BASE_URL +
          '/formation/formations/user/' +
          this.userStore.getUserConnected$().value?.id
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
      }>(`${environment.BASE_URL}/formation/formations/`, formation)
      .pipe(
        tap((response) => this.activeUserFormations$.next(response.formations))
      );
  }

  updateFormationUser(formation: FormationDTO): Observable<{
    success: string;
    affectedRows: number;
    formations: FormationDTO[];
  }> {
    return this.http
      .put<{
        success: string;
        affectedRows: number;
        formations: FormationDTO[];
      }>(
        `${environment.BASE_URL}/formation/formations/${formation.id}`,
        formation
      )
      .pipe(
        tap((response) => this.activeUserFormations$.next(response.formations))
      );
  }

  deleteFormationUser(formationId: number): Observable<{
    success: string;
    message: string;
    formations: FormationDTO[];
  }> {
    return this.http
      .delete<{
        success: string;
        message: string;
        formations: FormationDTO[];
      }>(
        `${environment.BASE_URL}/formation/formations/${formationId}/${
          this.userStore.getUserConnected$().value?.id
        }`
      )
      .pipe(
        tap((response) => this.activeUserFormations$.next(response.formations))
      );
  }

  // CRUD Skill for active mentor
  getUserSkills() {
    return this.http
      .get<Skill[]>(
        environment.BASE_URL +
          '/skill/skills/user/' +
          this.userStore.getUserConnected$().value?.id
      )
      .pipe(tap((skills) => this.activeUserSkills$.next(skills)));
  }

  updateUserSkills(skills: Skill[]) {
    return this.http
      .post<{ success: boolean; message: string; skills: Skill[] }>(
        environment.BASE_URL +
          '/skill/skills/user/' +
          this.userStore.getUserConnected$().value?.id,
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
        environment.BASE_URL +
          '/experience/experiences/user/' +
          this.userStore.getUserConnected$().value?.id
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
      }>(`${environment.BASE_URL}/experience/experiences/`, {
        ...experience,
        userId: this.userStore.getUserConnected$().value?.id,
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
      }>(`${this.BASE_URL}/experience/experiences/${experienceId}`, {
        ...experience,
        userId: this.userStore.getUserConnected$().value?.id,
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
      }>(
        `${this.BASE_URL}/experience/experiences/${experienceId}/${
          this.userStore.getUserConnected$().value?.id
        }`
      )
      .pipe(
        tap((res) => {
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
