import { Component, Input, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrl: './card-formation.component.scss',
})
export class CardFormationComponent {
  @Input() formation!: Formation;
  isVisibleFormEditCourse = false;
  popupDeleteVisible = false;

  windowWatcherService = inject(WindowWatcherService);
  userService = inject(UserService);
  mentorService = inject(MentorService);

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
    this.mentorService.updateFormationMentor(formation).subscribe();
    this.isVisibleFormEditCourse = false;
  }
  deleteFormation() {
    const formationId = this.formation.id;
    this.mentorService.deleteFormationMentor(formationId as number).subscribe();
  }
}
