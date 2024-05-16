import { Component, Input, OnDestroy, inject } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { UserService } from '../../../../user.service';
import { Subscription } from 'rxjs';

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
  userService = inject(UserService);
  formationsSubscriptions!: Subscription;

  addCourse() {
    this.isVisibleFormCourse = true;
  }

  hideAddFormation() {
    this.isVisibleFormCourse = false;
  }

  postFormation(formation: Formation) {
    console.log('output formation : ', formation);
    this.formationsSubscriptions = this.userService
      .postFormationMentor(formation)
      .subscribe();
  }

  ngOnDestroy(): void {
    this.formationsSubscriptions?.unsubscribe();
  }
}
