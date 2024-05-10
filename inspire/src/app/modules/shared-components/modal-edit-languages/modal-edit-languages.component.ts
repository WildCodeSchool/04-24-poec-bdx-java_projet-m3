import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '../../../shared/models/language';

@Component({
  selector: 'app-modal-edit-languages',
  templateUrl: './modal-edit-languages.component.html',
  styleUrl: './modal-edit-languages.component.scss',
})
export class ModalEditLanguagesComponent implements OnInit {
  @Input() question: string = '';
  @Input() subtitle: string = '';
  @Output() onValidate = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() visible: boolean = true;

  @Input() selectedLanguages!: Language[];
  @Input() languages: Language[] = [
    {
      id: 1,
      name: 'francais',
    },
    {
      id: 2,
      name: 'anglais',
    },
    {
      id: 3,
      name: 'arabe',
    },
    {
      id: 4,
      name: 'italien',
    },
    {
      id: 5,
      name: 'espagnol',
    },
    {
      id: 6,
      name: 'chinois',
    },
  ];

  focusBtnCancel = true;
  focusBtnValidate = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.selectedLanguages);
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.onCancel.emit();
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
