import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Language } from '../../../../shared/models/language';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../user.service';

@Component({
  selector: 'app-list-language',
  templateUrl: './list-language.component.html',
  styleUrl: './list-language.component.scss',
})
export class ListLanguageComponent {
  @Input() title: string = '';
  @Input() languages!: Language[];
  isModalVisible = false;

  userService = inject(UserService);
  destroyRef = inject(DestroyRef);

  showEditModal() {
    this.isModalVisible = true;
  }

  hideEditModal() {
    this.isModalVisible = false;
  }
  updateLanguages(newLanguages: Language[]) {
    this.userService
      .updateMentorLanguages(newLanguages)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.isModalVisible = false;
  }
}
