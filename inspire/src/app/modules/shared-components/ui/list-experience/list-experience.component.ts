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
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrl: './list-experience.component.scss',
})
export class ListExperienceComponent {
  @Input() title: string = '';
  @Input() experiences!: ExperienceDTO[];
  @Input() editModeOn: boolean = true;
  isVisibleFormExperience = false;

  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  constructor(private messageService: MessageService) {}

  windowWatcherService = inject(WindowWatcherService);

  addExperience(experience: Experience) {
    this.userService
      .addUserExperience(experience)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Super ! ',
          detail: 'Votre expérience a bien été ajoutée',
        });
      });
    this.isVisibleFormExperience = false;
  }

  showAddExperienceForm() {
    this.isVisibleFormExperience = true;
  }

  hideAddExperience() {
    this.isVisibleFormExperience = false;
  }
}
