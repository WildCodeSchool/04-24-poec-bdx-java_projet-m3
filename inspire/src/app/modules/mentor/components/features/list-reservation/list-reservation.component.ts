import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.scss',
})
export class ListReservationComponent {
  list: any = [
    {
      student: {
        firstname: 'Marie',
        lastname: 'Delaire',
        email: 'marie@wcs.com',
        password: '1234',
        role: '',
        description: '',
      },
      promotion: 'JavaScript',
      subject: 'Aide au devoir',
      date: new Date(),
      slot: '10:00 - 12:00',
    },
    {
      student: {
        firstname: 'Mahdi',
        lastname: 'Mcheik',
        email: 'marie@wcs.com',
        password: '1234',
        role: '',
        description: '',
      },
      promotion: 'JavaScript',
      subject: 'Aide au devoir',
      date: new Date(),
      slot: '10:00 - 12:00',
    },
    {
      student: {
        firstname: 'Mathieu',
        lastname: '15 cheveaux',
        email: 'marie@wcs.com',
        password: '1234',
        role: '',
        description: '',
      },
      promotion: 'JavaScript',
      subject: 'Aide au devoir',
      date: new Date(),
      slot: '10:00 - 12:00',
    },
  ];
  @Input() title: string = '';
}
