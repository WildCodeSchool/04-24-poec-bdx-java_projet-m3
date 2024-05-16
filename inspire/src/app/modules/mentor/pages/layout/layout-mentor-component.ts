import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { UserService } from '../../../../user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MentorFullProfil } from '../../../../shared/models/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './layout-mentor-component.html',
  styleUrl: './layout-mentor-component.scss',
})
export class LayoutMentor implements OnInit, OnDestroy {
  showNavbar = true;
  modalVisible = false;
  userService = inject(UserService);
  mentorSubscription!: Subscription;

  windowWatcher = inject(WindowWatcherService);
  // b362
  serviceMentor = inject(MentorService);
  mentor$!: BehaviorSubject<MentorFullProfil>;

  toggleVisibility() {
    this.showNavbar = !this.showNavbar;
    console.log(this.showNavbar);
  }

  logout() {
    this.userService.logout();
  }

  ngOnInit(): void {
    this.windowWatcher.windowSizeChanged.subscribe((option) => {
      this.showNavbar = option;
    });
    // this.mentor$ = this.serviceMentor.activeMentor$;
    this.mentorSubscription = this.serviceMentor
      .getMentorById()
      .subscribe(() => (this.mentor$ = this.serviceMentor.activeMentor$));
  }
  ngOnDestroy(): void {
    this.mentorSubscription.unsubscribe();
  }
}
