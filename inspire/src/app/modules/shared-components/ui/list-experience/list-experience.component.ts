import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Experience } from '../../../../shared/models/experience';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrl: './list-experience.component.scss',
})
export class ListExperienceComponent {
  @Input() title: string = '';
  @Input() experiences!: Experience[];
  @Input() editModeOn: boolean = true;
  isVisibleFormExperience = false;

  userService = inject(UserService);
  destroyRef = inject(DestroyRef);

  windowWatcherService = inject(WindowWatcherService);

  addExperience(experience: Experience) {
    this.userService
      .addUserExperience(experience)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.isVisibleFormExperience = false;
  }

  showAddExperienceForm() {
    this.isVisibleFormExperience = true;
  }

  hideAddExperience() {
    this.isVisibleFormExperience = false;
  }
}
