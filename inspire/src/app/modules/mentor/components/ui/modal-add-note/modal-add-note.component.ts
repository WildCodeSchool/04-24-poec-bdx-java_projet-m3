import { Component, EventEmitter, Input, Output } from '@angular/core';
import { reservationForMentorDTO } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-modal-add-note',
  templateUrl: './modal-add-note.component.html',
  styleUrl: './modal-add-note.component.scss',
})
export class ModalAddNoteComponent {
  @Input() reservation!: reservationForMentorDTO;
  @Input() isHistory!: boolean;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter<string>();
  @Output() onDeleteReservation = new EventEmitter();
  @Output() onExit = new EventEmitter();

  editMessage: boolean = false;

  updateMessage() {
    this.onSubmit.emit(this.reservation.message);
    this.editMessage = false;
  }

  deleteReservation() {
    this.onDeleteReservation.emit();
  }

  exit() {
    this.onExit.emit();
  }
}
