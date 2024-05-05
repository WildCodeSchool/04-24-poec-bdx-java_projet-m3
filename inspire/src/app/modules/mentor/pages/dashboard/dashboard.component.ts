import { Component, inject } from '@angular/core';
import { ReservationService } from '../../../../shared/services/reservation.service';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  mentorService = inject(MentorService);
  reservations$ = inject(ReservationService).getMentorReservationList(
    this.mentorService.activeMentor$.value.profil.userId
  );
}
