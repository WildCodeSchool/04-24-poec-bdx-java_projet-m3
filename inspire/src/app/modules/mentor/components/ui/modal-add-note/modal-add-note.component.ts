import { Component, EventEmitter, Input, Output } from '@angular/core';
import { reservationForMentorDTO } from '../../../../../shared/models/reservation';

@Component({
  selector: 'app-modal-add-note',
  templateUrl: './modal-add-note.component.html',
  styleUrl: './modal-add-note.component.scss',
})
export class ModalAddNoteComponent {
  @Input() reservation!: reservationForMentorDTO;
  @Input() newNote!: string;
  @Input() isHistory!: boolean;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter<string>();
}
