import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '../../../shared/models/language';
import { FormControl, FormGroup } from '@angular/forms';

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

  languages!: Language[];
  @Input() selectedLanguages!: Language[];

  focusBtnCancel = true;
  focusBtnValidate = false;

  formGroup!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.languages = [
      {
        name: 'arabe',
      },
      {
        name: 'français',
      },
      {
        name: 'anglais',
      },
      {
        name: 'espagnol',
      },
      {
        name: 'portugais',
      },
      {
        name: 'chinois',
      },
      {
        name: 'japonais',
      },
      {
        name: 'hebreux',
      },
      {
        name: 'français',
      },
    ];

    this.formGroup = new FormGroup({
      selectedLanguages: new FormControl<Language[] | null>(
        this.selectedLanguages
      ),
    });
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
