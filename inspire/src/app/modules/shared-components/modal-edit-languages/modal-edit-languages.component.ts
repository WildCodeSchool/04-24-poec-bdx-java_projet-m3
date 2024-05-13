import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Language } from '../../../shared/models/language';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { MentorService } from '../../../shared/services/mentor.service';

@Component({
  selector: 'app-modal-edit-languages',
  templateUrl: './modal-edit-languages.component.html',
  styleUrl: './modal-edit-languages.component.scss',
})
export class ModalEditLanguagesComponent implements OnInit, OnDestroy {
  @Input() question: string = '';
  @Input() subtitle: string = '';
  @Output() onValidate = new EventEmitter<Language[]>();
  @Output() onCancel = new EventEmitter();
  @Input() visible: boolean = true;

  @Input() selectedLanguages!: Language[];
  languages!: Language[];

  userService = inject(UserService);

  userServiceSubscription!: Subscription;

  focusBtnCancel = true;
  focusBtnValidate = false;

  constructor() {}

  ngOnInit(): void {
    this.userServiceSubscription = this.userService
      .getListLanguages()
      .subscribe((listLanguages) => {
        this.languages = listLanguages;
      });
  }

  ngOnDestroy(): void {
    this.userServiceSubscription.unsubscribe();
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
    this.onCancel.emit();
    console.log();
  }

  validate() {
    this.onValidate.emit(this.selectedLanguages);
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
