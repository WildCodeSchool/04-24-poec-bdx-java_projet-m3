import { Component, DestroyRef, Input, inject } from '@angular/core';
import { Mentor, Student } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../../user.service';
import { UserStoreService } from '../../../../../shared/services/stores/user-store.service';
import { StudentService } from '../../../../../shared/services/student.service';

@Component({
  selector: 'app-card-infos',
  templateUrl: './card-infos.component.html',
  styleUrl: './card-infos.component.scss',
})
export class CardInfosComponent {
  @Input() mentor!: Mentor;
  @Input() chips!: Skill[];
  editFormApropoVisible = false;

  mentorService = inject(MentorService);
  studentService = inject(StudentService);
  userService = inject(UserService);
  userStoreService = inject(UserStoreService);
  destroyRef = inject(DestroyRef);

  openEditFormApropos() {
    this.editFormApropoVisible = true;
  }
  closeEditFormApropos() {
    this.editFormApropoVisible = false;
  }

  updateProfil(newProfil: { profil: Mentor | Student; skills: Skill[] }) {
    if (this.userStoreService.getUserConnected$().value?.role === 'mentor') {
      this.mentorService
        .updateMentorProfil(newProfil.profil)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
    if (this.userStoreService.getUserConnected$().value?.role === 'student') {
      this.studentService
        .updateStudentProfil(newProfil.profil)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }

    this.userService
      .updateMentorSkills(newProfil.skills)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
