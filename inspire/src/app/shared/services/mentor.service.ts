import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { Mentor, MentorDTO } from '../models/user';
import { UserStoreService } from './stores/user-store.service';
import { reservationForMentorDTO } from '../models/reservation';
import { FavoritesService } from '../../modules/students/shared/favorites.service';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  constructor(private httpClient: HttpClient) {}

  userConnected = inject(UserStoreService).getUserConnected$();

  activeMentorProfil$: BehaviorSubject<MentorDTO> =
    new BehaviorSubject<MentorDTO>({} as MentorDTO);
  mentorsReservations$: BehaviorSubject<reservationForMentorDTO[]> =
    new BehaviorSubject<reservationForMentorDTO[]>([]);

  getMentorProfil() {
    return this.httpClient
      .get<MentorDTO>(
        environment.BASE_URL + '/mentor/mentors/' + this.userConnected.value?.id
      )
      .pipe(tap((res) => this.activeMentorProfil$.next(res)));
  }

  getMentorProfilById(userId: number) {
    return this.httpClient.get<MentorDTO>(
      environment.BASE_URL + '/mentor/mentors/' + userId
    );
  }

  setActiveMentor(mentor: MentorDTO): void {
    this.activeMentorProfil$.next(mentor);
  }

  updateMentorProfil(profil: MentorDTO) {
    return this.httpClient
      .put<{ affectedRow: number; profil: MentorDTO; success: boolean }>(
        environment.BASE_URL +
          '/mentor/mentors/' +
          this.userConnected.value?.id,
        { ...profil, userId: this.userConnected.value?.id }
      )
      .pipe(tap((result) => this.activeMentorProfil$.next(result.profil)));
  }

  getMentorsList() {
    return this.httpClient.get<MentorDTO[]>(
      environment.BASE_URL + '/mentor/mentors'
    );
  }

  getMentorListPagination(perPage: number, offset: number) {
    return this.httpClient.get<Mentor[]>(
      environment.BASE_URL +
        `/mentor/mentors?perPage=${perPage}&offset=${offset}`
    );
  }

  getMentorListFavoriteByStudent(studentId: number): Observable<MentorDTO[]> {
    return this.httpClient.get<MentorDTO[]>(
      environment.BASE_URL + `/favorite/mentors/${studentId}`
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
          profil: MentorDTO;
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
