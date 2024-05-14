import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss'
})
export class StudentLayoutComponent implements OnInit {
  showNavbar = true;
  modalVisible = false;
  userService = inject(UserService);

  windowWatcher = inject(WindowWatcherService);
  // b362
  student$ = inject(MentorService).getMentorById();

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
  }
}
