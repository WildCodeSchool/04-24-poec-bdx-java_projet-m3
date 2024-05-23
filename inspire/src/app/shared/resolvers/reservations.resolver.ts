import { ResolveFn } from '@angular/router';
import { reservationForMentorDTO } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { inject } from '@angular/core';
import { Mentor } from '../models/user';
import { MentorService } from '../services/mentor.service';
import { UserService } from '../../user.service';
import { UserStoreService } from '../services/stores/user-store.service';
import { switchMap } from 'rxjs';

export const mentorReservationsResolver: ResolveFn<{
  reservations: reservationForMentorDTO[];
  total: number;
}> = (route, state) => {
  const mentorId = inject(UserStoreService).getUserConnected$().value?.id;
  const reservationService = inject(ReservationService);

  return inject(MentorService)
    .getMentorProfil()
    .pipe(
      switchMap((res) =>
        reservationService.getMentorReservationList(res?.id || 0, 10, 0)
      )
    );
};

export const mentorReservationsHistoryResolver: ResolveFn<{
  reservations: reservationForMentorDTO[];
  total: number;
}> = (route, state) => {
  const mentorId = inject(UserStoreService).getUserConnected$().value?.id;
  const reservationService = inject(ReservationService);
  return inject(MentorService)
    .getMentorProfil()
    .pipe(
      switchMap((res) =>
        reservationService.getMentorReservationHistoryList(res?.id || 0, 10, 0)
      )
    );
};
