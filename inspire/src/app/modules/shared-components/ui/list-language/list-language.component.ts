import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Language } from '../../../../shared/models/language';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-list-language',
  templateUrl: './list-language.component.html',
  styleUrl: './list-language.component.scss',
})
export class ListLanguageComponent {
  @Input() title: string = '';
  @Input() languages!: Language[];
  @Input() editModeOn: boolean = true;

  isModalVisible = false;

  userService = inject(UserService);
  userConnected = inject(UserStoreService).getUserConnected$();
  destroyRef = inject(DestroyRef);
  constructor(private messageService: MessageService) {}

  showEditModal() {
    this.isModalVisible = true;
  }

  hideEditModal() {
    this.isModalVisible = false;
  }
  updateLanguages(newLanguages: Language[]) {
    this.userService
      .updateUserLanguages(newLanguages)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre langues ont bien été modifiées',
        });
      });

    this.isModalVisible = false;
  }
}
