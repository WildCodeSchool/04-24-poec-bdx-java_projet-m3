import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { StudentService } from '../../../../shared/services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss',
})
export class StudentLayoutComponent implements OnInit {
  showNavbar = true;
  modalVisible = false;

  listLink: {
    title: string;
    logoUrl: string;
    logoUrlActive: string;
    path: string;
    active: boolean;
  }[] = [
    {
      title: 'Mon profil',
      logoUrl: 'assets/svgs/dash.svg',
      logoUrlActive: 'assets/svgs/dash-white.svg',
      path: 'student',
      active: true,
    },
    {
      title: 'Mentors',
      logoUrl: 'assets/svgs/calendar.svg',
      logoUrlActive: 'assets/svgs/calendar-white.svg',
      path: 'student/list-mentors',
      active: false,
    },
    {
      title: 'Mes favoris',
      logoUrl: 'assets/svgs/edit.svg',
      logoUrlActive: 'assets/svgs/edit-white.svg',
      path: 'student/list-favorites',
      active: false,
    },
    {
      title: 'Mes réservations',
      logoUrl: 'assets/svgs/edit.svg',
      logoUrlActive: 'assets/svgs/edit-white.svg',
      path: 'student',
      active: false,
    },
  ];

  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
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
