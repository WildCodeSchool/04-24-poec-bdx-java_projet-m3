import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Reservation, reservationForMentorDTO } from '../models/reservation';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { ReservationForStudentDTO } from '../models/reservation';
import { MentorService } from './mentor.service';
import { StudentService } from './student.service';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  httpClient = inject(HttpClient);
  pagination = inject(PaginationService);

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

  mentorService = inject(MentorService);
  studentService = inject(StudentService);

  constructor() {}

  addSlotToMentor(slotInfo: any): Observable<any> {
    const formattedSlotInfo = {
      dateBegin: slotInfo.dateBegin,
      dateEnd: slotInfo.dateEnd,
      visio: slotInfo.visio,
      mentorId: slotInfo.mentorId,
    };

    return this.httpClient
      .post(`${environment.BASE_URL_API}/user/slot/add`, formattedSlotInfo)
      .pipe(switchMap(() => this.getSlotsForMentor(slotInfo.mentorId)));
  }

  getSlotsForMentor(mentorId: number): Observable<any> {
    console.log('getSlotsformentor', mentorId);
    return this.httpClient.get(
      `${environment.BASE_URL_API}/user/slot/get/${mentorId}`
    );
  }

  getSlotsforStudentByMentorId(mentorId: number): Observable<any> {
    const studentId = this.studentService.activeStudentProfil$.value.id;
    let end = new Date();
    end.setDate(end.getDate() + 50);
    return this.httpClient.post(
      `${environment.BASE_URL_API}/user/slot/slots/${mentorId}/${studentId}`,
      { start: new Date(), end: end }
    );
  }

  deleteSlot(id: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.BASE_URL_API}/user/slot/delete/${id}`
    );
  }

  deleteReservationAndSlot(id: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.BASE_URL_API}/reservation/delete/mentor/${id}`
    );
  }

  deleteReservationOnly(id: number): Observable<any> {
    return this.httpClient.delete(
      `${environment.BASE_URL_API}/reservation/delete/mentor/reservation/${id}`
    );
  }

  updateSlot(id: number, slotInfo: any): Observable<any> {
    const updatedSlotInfo = {
      id: id,
      dateBegin: slotInfo.dateBegin,
      dateEnd: slotInfo.dateEnd,
      visio: slotInfo.visio,
      mentorId: slotInfo.mentorId,
    };

    return this.httpClient.put(
      `${environment.BASE_URL_API}/user/slot/update`,
      updatedSlotInfo
    );
  }

  getMentorReservationList(userId: number, perPage: number, offset: number) {
    const mentorId = this.mentorService.activeMentorProfil$.value.id;
    return this.httpClient
      .get<{
        reservations: reservationForMentorDTO[];
        total: number;
      }>(
        environment.BASE_URL_API +
          `/reservation/get/mentor/upcoming/${mentorId}/${perPage}/${offset}`
      )
      .pipe(
        tap((res) => {
          console.log(res);

          this.activeMentorReservations$.next(res);
        })
      );
  }

  getMentorReservationHistoryList(
    userId: number,
    perPage: number,
    offset: number
  ) {
    const mentorId = this.mentorService.activeMentorProfil$.value.id;
    return this.httpClient
      .get<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL_API +
          `/reservation/get/mentor/history/${mentorId}/${perPage}/${offset}`
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
    const mentorId = this.mentorService.activeMentorProfil$.value.id;
    return this.httpClient
      .put<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL_API +
          `/reservation/update/${id}/${this.pagination.offsetReservationMentorHistory.value}`,
        {
          message,
          mentorId,
        }
      )
      .pipe(
        tap((res) => {
          console.log('new list ', res);
          this.activeMentorReservationsHistory$.next(res);
        })
      );
  }

  getStudentReservationList(userId: number, perPage: number, offset: number) {
    const studentId = this.studentService.activeStudentProfil$.value.id;
    return this.httpClient
      .get<{
        reservations: ReservationForStudentDTO[];
        total: number;
      }>(
        environment.BASE_URL_API +
          `/reservation/get/student/upcoming/${studentId}/${perPage}/${offset}`
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
    const studentId = this.studentService.activeStudentProfil$.value.id;

    return this.httpClient
      .get<{ reservations: ReservationForStudentDTO[]; total: number }>(
        environment.BASE_URL_API +
          `/reservation/get/student/history/${studentId}/${perPage}/${offset}`
      )
      .pipe(
        tap((res) => {
          this.activeStudentReservationsHistory$.next(res);
        })
      );
  }

  removeMentorReservation(
    reservationId: number,
    mentorId: number,
    first: number
  ): Observable<{
    reservations: reservationForMentorDTO[];
    total: number;
  }> {
    const total = this.activeMentorReservations$.value.total;

    return this.httpClient
      .delete<{ reservations: reservationForMentorDTO[]; total: number }>(
        environment.BASE_URL_API +
          `/reservation/delete/mentor/reservation/${reservationId}`
      )
      .pipe(
        switchMap(() => {
          if (total % 5 === 1 && total > 5) {
            this.pagination.offsetReservationStudent.next(
              this.pagination.offsetReservationStudent.value - 1
            );
            return this.getMentorReservationList(mentorId, 5, first - 5);
          }
          return this.getMentorReservationList(mentorId, 5, first);
        })
      );
  }

  removeReservationByStudent(
    reservationId: number,
    studentId: number,
    first: number
  ): Observable<{
    reservations: ReservationForStudentDTO[];
    total: number;
  }> {
    const total = this.activeStudentReservations$.value.total;

    return this.httpClient
      .delete<{ reservations: ReservationForStudentDTO[]; total: number }>(
        environment.BASE_URL_API +
          `/reservation/delete/student/${reservationId}`
      )
      .pipe(
        switchMap(() => {
          if (total % 5 === 1 && total > 5) {
            this.pagination.offsetReservationStudent.next(
              this.pagination.offsetReservationStudent.value - 1
            );
            return this.getStudentReservationList(studentId, 5, first - 5);
          }
          return this.getStudentReservationList(studentId, 5, first);
        })
      );
  }

  bookSlot(
    slotId: number,
    studentId: number,
    subject: string,
    details: string
  ) {
    const newReservation: Reservation = {
      slotId: slotId,
      studentId: studentId,
      subject: subject,
      details: details,
    };
    console.log('lolus');

    return this.httpClient.post<Reservation>(
      environment.BASE_URL_API + '/reservation/add',
      newReservation
    );
  }
}
