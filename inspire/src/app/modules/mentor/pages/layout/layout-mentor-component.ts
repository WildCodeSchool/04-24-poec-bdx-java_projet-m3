import { Component, OnInit, inject } from '@angular/core';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { MentorDTO, StudentDTO } from '../../../../shared/models/user';
import { StudentService } from '../../../../shared/services/student.service';
import { DashboardLink } from '../../../../shared/models/dashboardLink';
import { UserService } from '../../../../shared/services/user.service';
import { LoginService } from '../../../../shared/services/login.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './layout-mentor-component.html',
  styleUrl: './layout-mentor-component.scss',
})
export class LayoutMentor implements OnInit {
  showNavbar = true;
  modalVisible = false;
  userService = inject(UserService);
  userStoreService = inject(UserStoreService);
  windowWatcher = inject(WindowWatcherService);
  activatedRoute = inject(ActivatedRoute);
  loginService = inject(LoginService);
  router = inject(Router);
  mentorProfil$: BehaviorSubject<MentorDTO> =
    inject(MentorService).activeMentorProfil$;
  studentProfil: BehaviorSubject<StudentDTO> =
    inject(StudentService).activeStudentProfil$;
  name!: string;
  intro!: string;
  imgUrl!: string;

  displayMobileNav = false;

  listLink: DashboardLink[] = [
    {
      title: 'dashboard',
      logoUrl: 'assets/svgs/tdb.svg',
      logoUrlActive: 'assets/svgs/dash-blanc.svg',
      path: 'mentor',
      active: true,
    },
    {
      title: 'mon profil',
      logoUrl: 'assets/svgs/profile.svg',
      logoUrlActive: 'assets/svgs/profile-blanc.svg',
      path: 'mentor/profil',
      active: false,
    },
    {
      title: 'agenda',
      logoUrl: 'assets/svgs/agenda.svg',
      logoUrlActive: 'assets/svgs/agenda-blanc.svg',
      path: 'mentor/agenda',
      active: false,
    },
  ];

  toggleVisibility() {
    this.showNavbar = !this.showNavbar;
  }

  // goToProfile() {
  //   this.router.navigate(['mentor/profil']);
  // }

  logout() {
    this.loginService.logout();
    this.modalVisible = false;
  }

  ngOnInit(): void {
    this.windowWatcher.windowSizeChanged.subscribe((option) => {
      this.showNavbar = option;
      this.name = this.mentorProfil$.value.firstname;

      this.intro = 'Votre espace Mentor de la Wild Code School';
    });

    this.imgUrl = this.mentorProfil$.value.imgUrl;
  }
}
