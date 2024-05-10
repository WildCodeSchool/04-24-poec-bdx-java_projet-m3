import { Component, Input, inject } from '@angular/core';
import { Experience } from '../../../../shared/models/experience';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrl: './list-experience.component.scss',
})
export class ListExperienceComponent {
  @Input() title: string = '';
  @Input() experiences!: Experience[];
  isVisibleFormExperience = false;

  windowWatcherService = inject(WindowWatcherService);

  addExperience() {
    this.isVisibleFormExperience = true;
  }

  hideAddExperience = () => {
    this.isVisibleFormExperience = false;
  };
}
