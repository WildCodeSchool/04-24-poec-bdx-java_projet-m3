import { Component, Input, OnInit } from '@angular/core';
import { reservationForMentorDTO } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-row-reservation',
  templateUrl: './row-reservation-student.component.html',
  styleUrl: './row-reservation-student.component.scss',
})
export class RowReservationComponent implements OnInit {
  @Input()
  reservation!: reservationForMentorDTO;
  @Input()
  bgColor: string = 'transparent';
  @Input()
  slotLength: number = 1;
  endAt!: Date;

  ngOnInit(): void {
    this.endAt = new Date(this.reservation.dateTime);
    this.endAt.setTime(this.endAt.getTime() + this.slotLength * 3600000);
  }
}
