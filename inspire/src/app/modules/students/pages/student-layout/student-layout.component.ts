import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { StudentService } from '../../../../shared/services/student.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss',
})
export class StudentLayoutComponent implements OnInit {
  showNavbar = true;
  modalVisible = false;
  userService = inject(UserService);

  windowWatcher = inject(WindowWatcherService);

  student$ = inject(StudentService).activeStudentProfil$;

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
