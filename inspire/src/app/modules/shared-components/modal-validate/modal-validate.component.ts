import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-validate',
  templateUrl: './modal-validate.component.html',
  styleUrl: './modal-validate.component.scss',
})
export class ModalValidateComponent {
  @Input() question: string = '';
  @Output() onDelete = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() visible: boolean = false;

  focusBtnCancel = true;
  focusBtnValidate = false;

  deleteInfo() {
    this.onDelete.emit();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.onCancel.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

  focusValidate() {
    this.focusBtnValidate = true;
  }

  focusOutValidate() {
    this.focusBtnValidate = false;
  }

  focusCancel() {
    this.focusBtnCancel = true;
  }

  focusOutCancel() {
    this.focusBtnCancel = false;
  }
}
