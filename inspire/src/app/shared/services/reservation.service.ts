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
      dateEnd: slotInfo.dateEnd,
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

  deleteSlot(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.BASE_URL}/slot/slots/${id}`);
  }

  updateSlot(slotId: number, slotInfo: any): Observable<any> {
    const updatedSlotInfo = {
      id: slotId,
      dateTime: slotInfo.dateTime,
      dateEnd: slotInfo.dateEnd,
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
      .pipe(
        tap((res) => {
          this.activeMentorReservations$.next(res);
        })
      );
  }

  getMentorReservationHistoryList(
    userId: number,
    perPage: number,
    offset: number
  ) {
    return this.httpClient
      .get<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL +
          `/reservation/reservations/mentor/history/${userId}?perPage=${perPage}&offset=${offset}`
      )
      .pipe(
        tap((res) => {
          this.activeMentorReservationsHistory$.next(res);
        })
      );
  }

  updateMentorReservationHistoryList(
    id: number,
    userId: number,
    message: string
  ) {
    return this.httpClient
      .put<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL + `/reservation/reservations/${id}`,
        {
          message,
          mentorId: userId,
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
          this.activeStudentReservations$.next(res);
        })
      );
  }

  getStudentReservationHistoryList(
    userId: number,
    perPage: number,
    offset: number
  ) {
    return this.httpClient
      .get<{ reservations: ReservationForStudentDTO[]; total: number }>(
        environment.BASE_URL +
          `/reservation/reservations/user/history/${userId}?perPage=${perPage}&offset=${offset}`
      )
      .pipe(
        tap((res) => {
          this.activeStudentReservationsHistory$.next(res);
        })
      );
  }

  removeMentorReservation(id: number, userId: number) {
    return this.httpClient
      .delete<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL + `/reservation/reservations/${id}/${userId}`
      )
      .pipe(
        tap((res) => {
          this.activeMentorReservations$.next(res);
        })
      );
  }
}
