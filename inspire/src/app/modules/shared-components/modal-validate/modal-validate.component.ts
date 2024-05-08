import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-validate',
  templateUrl: './modal-validate.component.html',
  styleUrl: './modal-validate.component.scss',
})
export class ModalValidateComponent {
  @Input() question: string = '';
  @Output() onValidate = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() visible: boolean = false;

  focusBtnCancel = true;
  focusBtnValidate = false;

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  validate() {
    this.onValidate.emit();
    console.log('validate');
  }

  cancel() {
    this.onCancel.emit();
    console.log('validate');
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
