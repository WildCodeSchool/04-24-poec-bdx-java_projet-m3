import { Component, OnInit, inject } from '@angular/core';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { UserService } from '../../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { MentorDTO, StudentDTO } from '../../../../shared/models/user';
import { StudentService } from '../../../../shared/services/student.service';

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
  mentorProfil$: BehaviorSubject<MentorDTO> =
    inject(MentorService).activeMentorProfil$;
  studentProfil: BehaviorSubject<StudentDTO> =
    inject(StudentService).activeStudentProfil$;
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
      this.name = this.mentorProfil$.value.firstname;

      this.intro = 'Votre espace mentor de la Wild Code School';
    });

    this.imgUrl = this.mentorProfil$.value.imgUrl;
  }
}
