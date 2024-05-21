import { Component, Input } from '@angular/core';
import { reservationForMentorDTO } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-list-reservation-history',
  templateUrl: './list-reservation-history.component.html',
  styleUrl: './list-reservation-history.component.scss',
})
export class ListReservationHistoryComponent {
  @Input() reservations!: reservationForMentorDTO[];
  @Input() title: string = '';
  @Input() isHistory: boolean = false;
  @Input() isStudent: boolean = false;
}
