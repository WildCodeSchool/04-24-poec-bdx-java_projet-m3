import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { StudentService } from '../../../../shared/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { BehaviorSubject } from 'rxjs';
import { MentorDTO, StudentDTO } from '../../../../shared/models/user';
import { MentorService } from '../../../../shared/services/mentor.service';
import { DashboardLink } from '../../../../shared/models/dashboardLink';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss',
})
export class StudentLayoutComponent implements OnInit {
  showNavbar = true;
  modalVisible = false;
  userService = inject(UserService);
  userStoreService = inject(UserStoreService);
  windowWatcher = inject(WindowWatcherService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  studentProfil$: BehaviorSubject<StudentDTO> =
    inject(StudentService).activeStudentProfil$;

  displayMobileNav = false;

  listLink: DashboardLink[] = [
    {
      title: 'Mon profil',
      logoUrl: 'assets/svgs/dash.svg',
      logoUrlActive: 'assets/svgs/dash-white.svg',
      path: 'student',
      active: true,
    },
    {
      title: 'Trouver un mentor',
      logoUrl: 'assets/svgs/calendar.svg',
      logoUrlActive: 'assets/svgs/calendar-white.svg',
      path: 'student/list-mentors',
      active: false,
    },
    {
      title: 'Mes réservations',
      logoUrl: 'assets/svgs/edit.svg',
      logoUrlActive: 'assets/svgs/edit-white.svg',
      path: 'student/reservations',
      active: false,
    },
    {
      title: 'Mes favoris',
      logoUrl: 'assets/svgs/edit.svg',
      logoUrlActive: 'assets/svgs/edit-white.svg',
      path: 'student/list-favorites',
      active: false,
    },
  ];
  name!: string;
  intro!: string;
  imgUrl!: string;
  toggleVisibility() {
    this.showNavbar = !this.showNavbar;
  }

  logout() {
    this.userService.logout();
    this.modalVisible = false;
  }

  ngOnInit(): void {
    this.windowWatcher.windowSizeChanged.subscribe((option) => {
      this.showNavbar = option;
      this.name = this.studentProfil$.value.firstname;
      this.intro = 'Votre espace élève de la Wild Code School';
    });

    this.imgUrl = this.studentProfil$.value.imgUrl;
  }
}
