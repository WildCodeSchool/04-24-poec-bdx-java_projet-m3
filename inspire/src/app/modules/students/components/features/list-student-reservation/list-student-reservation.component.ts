import { Component, Input } from '@angular/core';
import { ReservationForStudentDTO } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-list-student-reservation',
  templateUrl: './list-student-reservation.component.html',
  styleUrl: './list-student-reservation.component.scss'
})
export class ListStudentReservationComponent {
  @Input() reservations!: ReservationForStudentDTO[];
  @Input() title: string = '';
  @Input() isHistory: boolean = false;
  @Input() isStudent: boolean = false;
}
