import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrl: './card-formation.component.scss',
})
export class CardFormationComponent {
  @Input() formation!: Formation;
  @Input() editModeOn: boolean = true;
  isVisibleFormEditCourse = false;
  popupDeleteVisible = false;

  windowWatcherService = inject(WindowWatcherService);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }

  hideEditForm() {
    this.isVisibleFormEditCourse = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }

  editForm(formation: Formation) {
    this.userService
      .updateFormationUser(formation)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.isVisibleFormEditCourse = false;
  }

  deleteFormation() {
    const formationId = this.formation.id;
    this.userService
      .deleteFormationUser(formationId as number)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
