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
      firstname: 'Marie',
      lastname: 'Delaire',
      imgUrl: 'https://randomuser.me,api/portraits',
      description: '',
      githubUrl: '',
      linkedinUrl: '',
      userId: '',
      title: '',
    },
    promotion: 'JavaScript',
    subject: 'Aide au devoir',
    date: new Date(),
    slot: '10:00 - 12:00',
  };
  @Input()
  bgColor: string = 'transparent';
}
