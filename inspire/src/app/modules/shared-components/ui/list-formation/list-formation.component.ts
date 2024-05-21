import { Component, Input, OnDestroy, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { Subscription } from 'rxjs';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrl: './list-formation.component.scss',
})
export class ListFormationComponent implements OnDestroy {
  @Input() title: string = '';
  @Input() formations!: Formation[];
  isVisibleFormCourse = false;

  windowWatcherService = inject(WindowWatcherService);
  mentorService = inject(MentorService);
  formationsSubscriptions!: Subscription;

  addCourse() {
    this.isVisibleFormCourse = true;
  }

  hideAddFormation() {
    this.isVisibleFormCourse = false;
  }

  ngOnDestroy(): void {
    this.formationsSubscriptions?.unsubscribe();
  }
}
