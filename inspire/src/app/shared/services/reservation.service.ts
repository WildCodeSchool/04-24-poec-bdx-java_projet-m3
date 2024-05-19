import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  ReservationForStudentDTO,
  reservationForMentorDTO,
} from '../models/reservation';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  httpClient = inject(HttpClient);

  constructor() {}
  getMentorReservationList(id: number, perPage: number, offset: number) {
    return this.httpClient.get<{
      reservations: reservationForMentorDTO[];
      total: number;
    }>(
      environment.BASE_URL +
        `/reservation/reservations/mentor/${id}?perPage=${perPage}&offset=${offset}`
    );
  }
  getMentorReservationHistoryList(id: number, perPage: number, offset: number) {
    console.log('called');

    return this.httpClient
      .get<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL +
          `/reservation/reservations/mentor/history/${id}?perPage=${perPage}&offset=${offset}`
        // `http://localhost:3310/reservation/reservations/mentor/history/1?perPage=3&offset=0`
      )
      .pipe(tap((res) => console.log('res', res)));
  }
}
