import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Experience } from '../../../../shared/models/experience';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrl: './card-experience.component.scss',
})
export class CardExperienceComponent {
  @Input() experience!: Experience;
  isVisibleFormEditExperience = false;
  popupDeleteVisible = false;

  windowWatcherService = inject(WindowWatcherService);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);

  showEditForm() {
    this.isVisibleFormEditExperience = true;
  }

  hideEditForm() {
    this.isVisibleFormEditExperience = false;
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }

  deleteExperience() {
    const experienceId = this.experience.id;
    this.userService
      .deleteExperience(experienceId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.popupDeleteVisible = false;
  }
}
