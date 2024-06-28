import { Component, DestroyRef, Input, inject } from '@angular/core';
import {
  Experience,
  ExperienceDTO,
} from '../../../../shared/models/experience';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrl: './card-experience.component.scss',
})
export class CardExperienceComponent {
  @Input() editModeOn: boolean = false;
  @Input() experience!: ExperienceDTO;
  isVisibleFormEditExperience = false;
  popupDeleteVisible = false;

  windowWatcherService = inject(WindowWatcherService);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  constructor(private messageService: MessageService) {}

  showEditForm() {
    this.isVisibleFormEditExperience = true;
  }

  hideEditForm() {
    this.isVisibleFormEditExperience = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }

  editExperience(experience: ExperienceDTO) {
    this.userService
      .editExperience(experience, experience.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre expérience a bien été modifiée',
        });
      });
  }

  deleteExperience() {
    const experienceId = this.experience.id;

    this.userService
      .deleteExperience(experienceId || 0)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre expérience a bien été supprimée',
        });
      });
    this.popupDeleteVisible = false;
  }
}
