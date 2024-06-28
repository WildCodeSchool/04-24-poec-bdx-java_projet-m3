import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Language } from '../../../shared/models/language';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { AutoDestroy } from '../../../shared/utilities/decorators';
import { UserService } from '../../../shared/services/user.service';

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
  @AutoDestroy destroy$: Subject<void> = new Subject<void>();

  userService = inject(UserService);
  userStoreService = inject(UserStoreService);
  destroyRef = inject(DestroyRef);

  userServiceSubscription!: Subscription;

  focusBtnCancel = true;
  focusBtnValidate = false;

  constructor() {}

  toTitleCase(ele: string): string {
    if (ele.length) return ele.charAt(0).toUpperCase() + ele.slice(1);
    return ele;
  }

  ngOnInit(): void {
    this.userService
      .getListLanguages()
      .pipe(take(1))
      .subscribe((listLanguages) => {
        this.languages = listLanguages.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
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
    this.onValidate.emit(this.selectedLanguages);
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

  ngOnDestroy(): void {}
}
