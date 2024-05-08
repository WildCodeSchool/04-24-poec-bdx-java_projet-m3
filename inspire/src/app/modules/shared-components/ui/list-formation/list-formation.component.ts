import { Component, Input, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrl: './list-formation.component.scss',
})
export class ListFormationComponent {
  @Input() title: string = '';
  @Input() formations!: Formation[];
  isVisibleFormCourse = false;

  windowWatcherService = inject(WindowWatcherService);

  addCourse() {
    this.isVisibleFormCourse = true;
  }

  hideAddFormation = () => {
    this.isVisibleFormCourse = false;
  };
}
