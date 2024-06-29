import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Mentor, MentorDTO } from '../models/user';
import { UserStoreService } from './stores/user-store.service';
import { reservationForMentorDTO } from '../models/reservation';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  constructor() {}

  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();
  loading$ = inject(UserService).isLoading$;

  activeMentorProfil$: BehaviorSubject<MentorDTO> =
    new BehaviorSubject<MentorDTO>({} as MentorDTO);
  mentorsReservations$: BehaviorSubject<reservationForMentorDTO[]> =
    new BehaviorSubject<reservationForMentorDTO[]>([]);

  getMentorProfil() {
    return this.httpClient
      .get<MentorDTO>(
        environment.BASE_URL_API + '/mentor/' + this.userConnected.value.id
      )
      .pipe(
        tap((res) => {
          console.log('recieved mentor ', res);

          this.activeMentorProfil$.next(res);
        })
      );
  }

  getMentorProfilById(userId: number) {
    return this.httpClient.get<MentorDTO>(
      environment.BASE_URL_API + '/mentor/' + userId
    );
  }

  setActiveMentor(mentor: MentorDTO): void {
    this.activeMentorProfil$.next(mentor);
  }

  updateMentorProfil(profil: MentorDTO) {
    return this.httpClient
      .put<{ affectedRow: number; profil: MentorDTO; success: boolean }>(
        environment.BASE_URL_API + '/mentor/' + this.userConnected.value.id,
        { ...profil, userId: this.userConnected.value.id }
      )
      .pipe(
        tap((result) => {
          console.log(' new profil ', result);

          this.activeMentorProfil$.next(profil);
        })
      );
  }

  getMentorsList() {
    return this.httpClient
      .get<MentorDTO[]>(environment.BASE_URL_API + '/mentor/get/all')
      .pipe(tap((res) => console.log(res)));
  }

  getMentorsBySkills(skills: string[]): Observable<MentorDTO[]> {
    const params = { skills: skills.join(',') };
    return this.httpClient.get<MentorDTO[]>(
      `${environment.BASE_URL_API}/mentor/by-skills`,
      { params }
    );
  }

  getMentorsByExperienceYears(
    minYears: number,
    maxYears: number
  ): Observable<MentorDTO[]> {
    return this.httpClient.get<MentorDTO[]>(
      `${environment.BASE_URL_API}/mentor/by-experience?minYears=${minYears}&maxYears=${maxYears}`
    );
  }

  getMentorsByAvailability(period: string): Observable<MentorDTO[]> {
    const params = { period };
    return this.httpClient.get<MentorDTO[]>(
      `${environment.BASE_URL_API}/mentor/available`,
      { params }
    );
  }

  getMentorsByMultipleFilters(
    skillNames: string[],
    minYears: number,
    maxYears: number,
    period: string
  ): Observable<MentorDTO[]> {
    const filters = {
      skills: skillNames,
      minYears,
      maxYears,
      period,
    };
    return this.httpClient.post<MentorDTO[]>(
      `${environment.BASE_URL_API}/filter`,
      filters
    );
  }

  getMentorListPagination(perPage: number, offset: number) {
    return this.httpClient.get<Mentor[]>(
      environment.BASE_URL_API +
        `/mentor/mentors?perPage=${perPage}&offset=${offset}`
    );
  }

  getMentorListFavoriteByStudent(studentId: number): Observable<MentorDTO[]> {
    return this.httpClient.get<MentorDTO[]>(
      environment.BASE_URL_API + `/student/favorite/list/${studentId}`
    );
  }

  getMentorReservationsList() {
    return this.httpClient.get<reservationForMentorDTO[]>(
      environment.BASE_URL +
        '/reservation/reservations/mentor' +
        this.userConnected.value?.id
    );
  }

  updateMentorImage(file: File) {
    if (file) {
      const formData = new FormData();
      this.loading$.next(true);
      formData.append('file', file);
      const headers = new HttpHeaders();
      return this.httpClient
        .post<MentorDTO>(
          environment.BASE_URL_API +
            '/user/upload/image/mentor/' +
            this.userConnected.value.id,
          formData,
          {
            headers: headers,
          }
        )
        .pipe(
          tap((res) => {
            this.activeMentorProfil$.next(res);
            this.loading$.next(false);
          })
        );
    } else return of();
  }
}
