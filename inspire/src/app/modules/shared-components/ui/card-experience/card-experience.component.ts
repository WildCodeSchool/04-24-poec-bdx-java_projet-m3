import { Component, Input, inject } from '@angular/core';
import { Experience } from '../../../../shared/models/experience';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';

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
    this.userService.deleteExperience(experienceId).subscribe();
  }
}
