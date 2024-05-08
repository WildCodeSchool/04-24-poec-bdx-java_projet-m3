import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '../../../shared/models/language';

@Component({
  selector: 'app-modal-edit-languages',
  templateUrl: './modal-edit-languages.component.html',
  styleUrl: './modal-edit-languages.component.scss',
})
export class ModalEditLanguagesComponent implements OnInit {
  @Input() question: string = '';
  @Output() onValidate = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() visible: boolean = true;

  @Input() selectedLanguages!: Language[];
  @Input() languages: Language[] = [
    {
      id: '1457',
      name: 'francais',
    },
    {
      id: '9b4b',
      name: 'anglais',
    },
    {
      id: 'c082',
      name: 'arabe',
    },
    {
      id: '90b9',
      name: 'italien',
    },
    {
      id: '23a9',
      name: 'espagnol',
    },
    {
      id: '07ed',
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
