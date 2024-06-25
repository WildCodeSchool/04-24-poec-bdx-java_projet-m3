import { Component, Input } from '@angular/core';
import { reservationForMentorDTO } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.scss',
})
export class ListReservationComponent {
  @Input() reservations!: reservationForMentorDTO[];
  @Input() title: string = '';
}
