import { Component, OnInit, inject } from '@angular/core';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { UserService } from '../../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { MentorDTO } from '../../../../shared/models/user';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  showNavbar = true;
  modalVisible = false;
  userService = inject(UserService);
  userStoreService = inject(UserStoreService);
  windowWatcher = inject(WindowWatcherService);
  activatedRoute = inject(ActivatedRoute);
  mentorProfil$: BehaviorSubject<MentorDTO> =
    inject(MentorService).activeMentorProfil$;
  toggleVisibility() {
    this.showNavbar = !this.showNavbar;
  }

  logout() {
    this.userService.logout();
  }

  ngOnInit(): void {
    this.windowWatcher.windowSizeChanged.subscribe((option) => {
      this.showNavbar = option;
    });
  }
}
