import { Component, DestroyRef, Input, OnDestroy, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrl: './list-formation.component.scss',
})
export class ListFormationComponent {
  @Input() title: string = '';
  @Input() formations!: Formation[];
  @Input() editModeOn: boolean = true;
  isVisibleFormCourse = false;

  windowWatcherService = inject(WindowWatcherService);
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);

  addCourse() {
    this.isVisibleFormCourse = true;
  }

  hideAddFormation() {
    this.isVisibleFormCourse = false;
  }

  addNewCourse(formation: Formation) {
    this.userService
      .addFormationUser(formation)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
