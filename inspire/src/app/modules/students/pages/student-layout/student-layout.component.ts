import { Component, OnInit, inject } from '@angular/core';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { StudentService } from '../../../../shared/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { BehaviorSubject } from 'rxjs';
import { MentorDTO, StudentDTO } from '../../../../shared/models/user';
import { MentorService } from '../../../../shared/services/mentor.service';
import { DashboardLink } from '../../../../shared/models/dashboardLink';
import { UserService } from '../../../../shared/services/user.service';
import { LoginService } from '../../../../shared/services/login.service';

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
  loginService = inject(LoginService);

  displayMobileNav = false;

  listLink: DashboardLink[] = [
    {
      title: 'Mon profil',
      logoUrl: 'assets/svgs/profile.svg',
      logoUrlActive: 'assets/svgs/profile-blanc.svg',
      path: 'student',
      active: true,
    },
    {
      title: 'Trouver un mentor',
      logoUrl: 'assets/svgs/find.svg',
      logoUrlActive: 'assets/svgs/find-blanc.svg',
      path: 'student/list-mentors',
      active: false,
    },
    {
      title: 'Mes réservations',
      logoUrl: 'assets/svgs/agenda.svg',
      logoUrlActive: 'assets/svgs/agenda-blanc.svg',
      path: 'student/reservations',
      active: false,
    },
    {
      title: 'Mes favoris',
      logoUrl: 'assets/svgs/coeur.svg',
      logoUrlActive: 'assets/svgs/coeur-blanc.svg',
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
    this.loginService.logout();
    this.modalVisible = false;
  }

  ngOnInit(): void {
    this.windowWatcher.windowSizeChanged.subscribe((option) => {
      this.showNavbar = option;
      this.name = this.studentProfil$.value.firstname;
      this.intro = 'Votre espace Étudiant de la Wild Code School';
    });

    this.imgUrl = this.studentProfil$.value.imgUrl;
  }
}
