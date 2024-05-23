import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Language } from '../../../../shared/models/language';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../user.service';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';

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

  showEditModal() {
    this.isModalVisible = true;
  }

  hideEditModal() {
    this.isModalVisible = false;
  }
  updateLanguages(newLanguages: Language[]) {
    if (this.userConnected.value?.role === 'mentor') {
      this.userService
        .updateUserLanguages(newLanguages)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }

    if (this.userConnected.value?.role === 'student') {
      this.userService
        .updateUserLanguages(newLanguages)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }

    this.isModalVisible = false;
  }
}
