import { Component, Input } from '@angular/core';
import { User } from '../models/user';
type reservation = {
  user: User;
  promotion: string;
  subject: string;
  date: Date;
  slot: string;
};
@Component({
  selector: 'app-row-reservation',
  templateUrl: './row-reservation.component.html',
  styleUrl: './row-reservation.component.scss',
})
export class RowReservationComponent {
  reservation: reservation = {
    user: {
      firstname: 'Marie',
      lastname: 'Delaire',
      email: 'marie@wcs.com',
      isMentor: false,
      password: '1234',
    },
    promotion: 'JavaScript',
    subject: 'Aide au devoir',
    date: new Date(),
    slot: '10:00 - 12:00',
  };
  @Input()
  bgColor: string = 'transparent';
}
