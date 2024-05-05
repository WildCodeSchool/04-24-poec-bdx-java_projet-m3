import { Component, Input } from '@angular/core';
import {
  Reservation,
  ResponseReservation,
} from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-row-reservation',
  templateUrl: './row-reservation-student.component.html',
  styleUrl: './row-reservation-student.component.scss',
})
export class RowReservationComponent {
  @Input()
  reservation!: ResponseReservation;
  @Input()
  bgColor: string = 'transparent';
}
