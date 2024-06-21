import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { reservationForMentorDTO } from '../../../../shared/models/reservation';
import { ReservationService } from '../../../../shared/services/reservation.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  reservations$!: Observable<{
    reservations: reservationForMentorDTO[];
    total: number;
  }>;
  reservationsHistory$!: Observable<{
    reservations: reservationForMentorDTO[];
    total: number;
  }>;
  first: number = 0;

  reservationService = inject(ReservationService);
  activeMentor$ = inject(MentorService).activeMentorProfil$;
  destroyRef = inject(DestroyRef);
  paginationService = inject(PaginationService);

  ngOnInit(): void {
    this.reservations$ =
      this.reservationService.activeMentorReservations$.asObservable();
    this.reservationsHistory$ =
      this.reservationService.activeMentorReservationsHistory$;
  }

  onPageChange(event: {
    page?: number | undefined;
    first?: number | undefined;
    rows?: number | undefined;
  }) {
    // this.first = (event.page || 0) * (event.rows || 0);
    // console.log('first', this.first);
    console.log('rien');

    this.paginationService.offsetReservationMentor.next(event.first || 0);

    this.reservationService
      .getMentorReservationList(
        this.activeMentor$.value.userId,
        5,
        event.first || 0
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  onPageChangeHistory(event: {
    page?: number | undefined;
    first?: number | undefined;
    rows?: number | undefined;
  }) {
    // this.first = (event.page || 0) * (event.rows || 0);
    // console.log('first', this.first);
    this.paginationService.offsetReservationMentorHistory.next(
      event.first || 0
    );

    this.reservationService
      .getMentorReservationHistoryList(
        this.activeMentor$.value.userId,
        5,
        event.first || 0
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
