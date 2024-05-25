import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { reservationForMentorDTO } from '../models/reservation';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ReservationForStudentDTO } from '../models/reservation';

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

  activeStudentReservations$: BehaviorSubject<{
    reservations: ReservationForStudentDTO[];
    total: number;
  }> = new BehaviorSubject({
    reservations: [] as ReservationForStudentDTO[],
    total: 0,
  });

  activeStudentReservationsHistory$: BehaviorSubject<{
    reservations: ReservationForStudentDTO[];
    total: number;
  }> = new BehaviorSubject({
    reservations: [] as ReservationForStudentDTO[],
    total: 0,
  });

  constructor() {}

  addSlotToMentor(slotInfo: any): Observable<any> {
    const formattedSlotInfo = {
      dateTime: slotInfo.dateTime,
      visio: slotInfo.visio,
      mentorId: slotInfo.mentorId,
    };

    return this.httpClient
      .post(`${environment.BASE_URL}/slot/slots`, formattedSlotInfo)
      .pipe(switchMap(() => this.getSlotsForMentor(slotInfo.mentorId)));
  }

  getSlotsForMentor(mentorId: number): Observable<any> {
    return this.httpClient.get(
      `${environment.BASE_URL}/slot/slots?mentorId=${mentorId}`
    );
  }

  updateSlot(slotId: number, slotInfo: any): Observable<any> {
    const updatedSlotInfo = {
      dateTime: slotInfo.dateTime,
      visio: slotInfo.visio,
      mentorId: slotInfo.mentorId,
    };

    return this.httpClient.put(
      `${environment.BASE_URL}/slot/slots/${slotId}`,
      updatedSlotInfo
    );
  }

  getMentorReservationList(userId: number, perPage: number, offset: number) {
    return this.httpClient
      .get<{
        reservations: reservationForMentorDTO[];
        total: number;
      }>(
        environment.BASE_URL +
          `/reservation/reservations/mentor/${userId}?perPage=${perPage}&offset=${offset}`
      )
      .pipe(tap((res) => this.activeMentorReservations$.next(res)));
  }

  getMentorReservationHistoryList(
    userId: number,
    perPage: number,
    offset: number
  ) {
    console.log('called');

    return this.httpClient
      .get<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL +
          `/reservation/reservations/mentor/history/${userId}?perPage=${perPage}&offset=${offset}`
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

  getStudentReservationList(userId: number, perPage: number, offset: number) {
    return this.httpClient
      .get<{
        reservations: ReservationForStudentDTO[];
        total: number;
      }>(
        environment.BASE_URL +
          `/reservation/reservations/user/${userId}?perPage=${perPage}&offset=${offset}`
      )
      .pipe(
        tap((res) => {
          console.log('ma liste de resa', res);
          this.activeStudentReservations$.next(res);
        })
      );
  }

  getStudentReservationHistoryList(
    userId: number,
    perPage: number,
    offset: number
  ) {
    console.log('called');

    return this.httpClient
      .get<{ reservations: ReservationForStudentDTO[]; total: number }>(
        environment.BASE_URL +
          `/reservation/reservations/user/history/${userId}?perPage=${perPage}&offset=${offset}`
      )
      .pipe(
        tap((res) => {
          this.activeStudentReservationsHistory$.next(res);
          console.log('reservations passés:', res);
        })
      );
  }
}
