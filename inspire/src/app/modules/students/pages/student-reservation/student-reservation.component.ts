import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationService } from '../../../../shared/services/reservation.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { ReservationForStudentDTO } from '../../../../shared/models/reservation';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/services/pagination.service';

@Component({
  selector: 'app-student-reservation',
  templateUrl: './student-reservation.component.html',
  styleUrl: './student-reservation.component.scss',
})
export class StudentReservationComponent implements OnInit {
  reservations$!: Observable<{
    reservations: ReservationForStudentDTO[];
    total: number;
  }>;
  reservationsHistory$!: Observable<{
    reservations: ReservationForStudentDTO[];
    total: number;
  }>;
  destroyRef = inject(DestroyRef);
  paginationService = inject(PaginationService);
  reservationService = inject(ReservationService);
  activeMentor$ = inject(MentorService).activeMentorProfil$;

  ngOnInit(): void {
    this.reservations$ = this.reservationService.activeStudentReservations$;
    this.reservationsHistory$ =
      this.reservationService.activeStudentReservationsHistory$;
  }

  onPageChange(event: {
    page?: number | undefined;
    first?: number | undefined;
    rows?: number | undefined;
  }) {
    // this.first = (event.page || 0) * (event.rows || 0);
    // this.first = event.first || 0;
    this.paginationService.offsetReservationStudent.next(event.first || 0);
    console.log(event.first);

    this.reservationService
      .getStudentReservationList(
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
    // this.firstHistory = (event.page || 0) * (event.rows || 0);
    // this.firstHistory = event.first || 0;
    this.paginationService.offsetReservationStudentHistory.next(
      event.first || 0
    );

    this.reservationService
      .getStudentReservationHistoryList(
        this.activeMentor$.value.userId,
        5,
        event.first || 0
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
