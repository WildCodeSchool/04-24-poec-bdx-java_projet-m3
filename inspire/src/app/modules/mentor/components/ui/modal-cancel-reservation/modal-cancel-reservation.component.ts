import { Component, EventEmitter, Input, Output } from '@angular/core';
import { reservationForMentorDTO } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-modal-cancel-reservation',
  templateUrl: './modal-cancel-reservation.component.html',
  styleUrl: './modal-cancel-reservation.component.scss',
})
export class ModalCancelReservationComponent {
  @Input() reservation!: reservationForMentorDTO;
  @Input() isHistory!: boolean;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter<string>();
  @Output() onDeleteReservation = new EventEmitter();

  deleteReservation() {
    this.onDeleteReservation.emit();
  }
}
