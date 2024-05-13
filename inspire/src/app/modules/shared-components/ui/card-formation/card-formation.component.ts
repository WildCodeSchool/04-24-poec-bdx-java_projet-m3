import { Component, Input, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';

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

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }

  hideEditForm() {
    this.isVisibleFormEditCourse = false;
    console.log('called');
  }

  showPopUpDelete() {
    this.popupDeleteVisible = true;
  }
  deleteFormation() {
    console.log('coucocuocucocu');
    const formationId = this.formation.id;
    console.log(formationId, 'coucou');
    this.userService.deleteFormation(formationId).subscribe();
  }
}
