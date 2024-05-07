import { Component, Input, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';

@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrl: './card-formation.component.scss',
})
export class CardFormationComponent {
  @Input() formation!: Formation;
  isVisibleFormEditCourse = false;

  windowWatcherService = inject(WindowWatcherService);

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }

  hideEditForm = () => {
    this.isVisibleFormEditCourse = false;
    console.log('called');
  };
}
