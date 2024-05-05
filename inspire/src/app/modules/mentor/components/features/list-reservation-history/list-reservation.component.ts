import { Component, Input } from '@angular/core';
import { ResponseReservation } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-list-reservation-history',
  templateUrl: './list-reservation-history.component.html',
  styleUrl: './list-reservation-history.component.scss',
})
export class ListReservationHistoryComponent {
  @Input() reservations!: ResponseReservation[];
  @Input() title: string = '';
}
