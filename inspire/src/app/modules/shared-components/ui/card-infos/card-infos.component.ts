import { Component, DestroyRef, Input, inject } from '@angular/core';
import {
  Mentor,
  MentorDTO,
  Student,
  StudentDTO,
} from '../../../../shared/models/user';
import { Skill } from '../../../../shared/models/chip';
import { MentorService } from '../../../../shared/services/mentor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../user.service';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { StudentService } from '../../../../shared/services/student.service';

@Component({
  selector: 'app-card-infos',
  templateUrl: './card-infos.component.html',
  styleUrl: './card-infos.component.scss',
})
export class CardInfosComponent {
  @Input() mentor!: MentorDTO;
  @Input() chips!: Skill[];
  @Input() editModeOn = true;
  editFormApropoVisible = false;
  isFavorite: boolean = false;

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
  updateProfil(newProfil: {
    profil: MentorDTO | StudentDTO;
    skills: Skill[];
    file?: File;
    fileName?: string;
  }) {
    if (newProfil.file && newProfil.fileName) {
      if (this.userStoreService.getUserConnected$().value?.role === 'mentor') {
        this.mentorService
          .updateMentorImage(newProfil.file)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }
      if (this.userStoreService.getUserConnected$().value?.role === 'student') {
        this.studentService
          .updateStudentImage(newProfil.file)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }
    }

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
      .updateUserSkills(newProfil.skills)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  toggleFavorite() {
    this.isFavorite != this.isFavorite;
  }
}
