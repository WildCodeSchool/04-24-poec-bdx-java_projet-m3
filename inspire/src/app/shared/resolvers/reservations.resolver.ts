import { ResolveFn } from '@angular/router';
import {
  ReservationForStudentDTO,
  reservationForMentorDTO,
} from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { inject } from '@angular/core';
import { UserStoreService } from '../services/stores/user-store.service';

export const mentorReservationsResolver: ResolveFn<{
  reservations: reservationForMentorDTO[];
  total: number;
}> = (route, state) => {
  const userId = inject(UserStoreService).getUserConnected$().value?.id;

  return inject(ReservationService).getMentorReservationList(userId, 5, 0);
};

export const mentorReservationsHistoryResolver: ResolveFn<{
  reservations: reservationForMentorDTO[];
  total: number;
}> = (route, state) => {
  const userId = inject(UserStoreService).getUserConnected$().value?.id;

  return inject(ReservationService).getMentorReservationHistoryList(
    userId,
    5,
    0
  );
};

export const studentReservationsResolver: ResolveFn<{
  reservations: ReservationForStudentDTO[];
  total: number;
}> = (route, state) => {
  const userId = inject(UserStoreService).getUserConnected$().value?.id;
  const reservationService = inject(ReservationService);

  return reservationService.getStudentReservationList(userId || 0, 5, 0);
};

export const studentReservationsHistoryResolver: ResolveFn<{
  reservations: ReservationForStudentDTO[];
  total: number;
}> = (route, state) => {
  const userId = inject(UserStoreService).getUserConnected$().value?.id;
  const reservationService = inject(ReservationService);
  return reservationService.getStudentReservationHistoryList(
    userId || 0,
    10,
    0
  );
};
