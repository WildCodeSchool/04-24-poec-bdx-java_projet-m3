import { Component, OnInit, inject } from '@angular/core';
import { reservationForMentorDTO } from '../../../../shared/models/reservation';
import { ReservationService } from '../../../../shared/services/reservation.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  reservations$!: Observable<reservationForMentorDTO[]>;
  reservationsHistory$!: Observable<reservationForMentorDTO[]>;

  reservationService = inject(ReservationService);
  activeMentor$ = inject(MentorService).activeMentorProfil$;

  ngOnInit(): void {
    this.reservations$ = this.reservationService
      .getMentorReservationList(1, 3, 0)
      .pipe(map((res) => res.reservations));
    this.reservationsHistory$ = this.reservationService
      .getMentorReservationHistoryList(1, 3, 0)
      .pipe(map((res) => res.reservations));
  }
}
