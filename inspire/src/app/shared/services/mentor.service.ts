import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { Mentor } from '../models/user';
import { UserStoreService } from './stores/user-store.service';
import { reservationForMentorDTO } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();

  constructor() {}

  activeMentorProfil$: BehaviorSubject<Mentor> = new BehaviorSubject<Mentor>(
    {} as Mentor
  );
  mentorsReservations$: BehaviorSubject<reservationForMentorDTO[]> =
    new BehaviorSubject<reservationForMentorDTO[]>([]);

  getMentorProfil() {
    return this.httpClient.get<Mentor>(
      environment.BASE_URL + '/mentor/mentors/' + this.userConnected.value?.id
    );
  }

  updateMentorProfil(profil: Mentor) {
    return this.httpClient
      .put<{ affectedRow: number; profil: Mentor; success: boolean }>(
        environment.BASE_URL +
          '/mentor/mentors/' +
          this.userConnected.value?.id,
        { ...profil, userId: this.userConnected.value?.id }
      )
      .pipe(tap((result) => this.activeMentorProfil$.next(result.profil)));
  }

  getMentorsList() {
    return this.httpClient.get<Mentor[]>(
      environment.BASE_URL + '/mentor/mentors'
    );
  }

  getMentorListPagination(perPage: number, offset: number) {
    return this.httpClient.get<Mentor[]>(
      environment.BASE_URL +
        `/mentor/mentors?perPage=${perPage}&offset=${offset}`
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

      formData.append('file', file);

      return this.httpClient
        .put<{
          affectedRow: number;
          profil: Mentor;
          success: boolean;
        }>(
          environment.BASE_URL +
            '/mentor/mentors/image/' +
            this.userConnected.value?.id,
          formData
        )
        .pipe(tap((res) => this.activeMentorProfil$.next(res.profil)));
    } else return of();
  }
}
