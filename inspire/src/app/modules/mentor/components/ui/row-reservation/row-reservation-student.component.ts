import { Component, Input } from '@angular/core';
import { Reservation } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-row-reservation',
  templateUrl: './row-reservation-student.component.html',
  styleUrl: './row-reservation-student.component.scss',
})
export class RowReservationComponent {
  @Input()
  reservation: Reservation = {
    student: {
      firstname: 'mahdi',
      lastname: 'mcheik',
      description: '',
      title: '',
      imgUrl: '',
      githubUrl: '',
      linkedinUrl: '',
      userId: '',
    },
    promotion: 'JavaScript',
    subject: 'Aide au devoir',
    date: new Date(),
    slot: '10:00 - 12:00',
  };
  @Input()
  bgColor: string = 'transparent';
}
