import { Component, Input, inject } from '@angular/core';
import { Experience } from '../../../../shared/models/experience';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';

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

  showEditForm() {
    this.isVisibleFormEditExperience = true;
  }

  hideEditForm = () => {
    this.isVisibleFormEditExperience = false;
    console.log('called');
  };

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }
}
