import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { reservationForMentorDTO } from '../models/reservation';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  httpClient = inject(HttpClient);

  activeMentorReservations$: BehaviorSubject<{
    reservations: reservationForMentorDTO[];
    total: number;
  }> = new BehaviorSubject({
    reservations: [] as reservationForMentorDTO[],
    total: 0,
  });

  activeMentorReservationsHistory$: BehaviorSubject<{
    reservations: reservationForMentorDTO[];
    total: number;
  }> = new BehaviorSubject({
    reservations: [] as reservationForMentorDTO[],
    total: 0,
  });

  constructor() {}

  addSlotToMentor(slotInfo: any): Observable<any> {
    // Reformater les données avant de les envoyer au backend
    const formattedSlotInfo = {
      dateTime: slotInfo.dateTime, // Vous pouvez formater si nécessaire, par exemple en utilisant toISOString()
      visio: slotInfo.visio,
      mentorId: slotInfo.mentorId,
    };

    return this.httpClient
      .post(`${environment.BASE_URL}/slot/slots`, formattedSlotInfo)
      .pipe(tap((res) => console.log('res', res)));
  }

  getMentorReservationList(id: number, perPage: number, offset: number) {
    return this.httpClient
      .get<{
        reservations: reservationForMentorDTO[];
        total: number;
      }>(
        environment.BASE_URL +
          `/reservation/reservations/mentor/${id}?perPage=${perPage}&offset=${offset}`
      )
      .pipe(tap((res) => this.activeMentorReservations$.next(res)));
  }
  getMentorReservationHistoryList(id: number, perPage: number, offset: number) {
    console.log('called');

    return this.httpClient
      .get<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL +
          `/reservation/reservations/mentor/history/${id}?perPage=${perPage}&offset=${offset}`
      )
      .pipe(
        tap((res) => {
          this.activeMentorReservationsHistory$.next(res);
          console.log('reservations hs', res);
        })
      );
  }

  updateMentorReservationHistoryList(
    id: number,
    mentorId: number,
    message: string
  ) {
    return this.httpClient
      .post<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL + `/reservation/reservations/mentor/${id}`,
        {
          mentorId,
          message,
        }
      )
      .pipe(
        tap((res) => {
          this.activeMentorReservationsHistory$.next(res);
        })
      );
  }
}
