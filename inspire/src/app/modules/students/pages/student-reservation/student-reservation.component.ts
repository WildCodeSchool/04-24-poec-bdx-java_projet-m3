import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationService } from '../../../../shared/services/reservation.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { ReservationForStudentDTO } from '../../../../shared/models/reservation';

@Component({
  selector: 'app-student-reservation',
  templateUrl: './student-reservation.component.html',
  styleUrl: './student-reservation.component.scss'
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

  reservationService = inject(ReservationService);
  activeMentor$ = inject(MentorService).activeMentorProfil$;

  ngOnInit(): void {
    this.reservations$ = this.reservationService.activeStudentReservations$;
    this.reservationsHistory$ =
      this.reservationService.activeStudentReservationsHistory$;
  }

}
