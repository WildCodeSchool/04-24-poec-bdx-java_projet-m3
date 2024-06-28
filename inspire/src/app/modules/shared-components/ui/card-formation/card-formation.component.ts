import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Formation, FormationDTO } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrl: './card-formation.component.scss',
})
export class CardFormationComponent {
  @Input() formation!: FormationDTO;
  @Input() editModeOn: boolean = true;
  isVisibleFormEditCourse = false;
  popupDeleteVisible = false;

  windowWatcherService = inject(WindowWatcherService);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  constructor(private messageService: MessageService) {}

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }

  hideEditForm() {
    this.isVisibleFormEditCourse = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }

  editForm(formation: FormationDTO) {
    this.userService
      .updateFormationUser(formation)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre formation a bien été modifiée',
        });
      });
    this.isVisibleFormEditCourse = false;
  }

  deleteFormation() {
    const formationId = this.formation.id;
    this.userService
      .deleteFormationUser(formationId as number)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre formation a bien été suprimée',
        });

        return (this.popupDeleteVisible = false);
      });
  }
}
