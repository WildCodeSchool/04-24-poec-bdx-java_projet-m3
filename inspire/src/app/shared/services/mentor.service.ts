import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { Mentor } from '../models/user';
import { UserStoreService } from './stores/user-store.service';
import { reservationForMentorDTO } from '../models/reservation';
import { FavoritesService } from '../../modules/students/shared/favorites.service';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  constructor(
    private httpClient: HttpClient,
    private userStoreService: UserStoreService,
    private favoritesService: FavoritesService
  ) {}
 
  userConnected = inject(UserStoreService).getUserConnected$();

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

  getMentorListFavoriteByStudent(studentId: number): Observable<Mentor[]> {
    return this.httpClient.get<Mentor[]>(environment.BASE_URL + `/favorite/mentors/${studentId}`);
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
        .pipe(tap(res => this.activeMentorProfil$.next(res.profil)));
    } else return of();
  }
}
