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
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { StudentService } from '../../../../shared/services/student.service';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { UserService } from '../../../../shared/services/user.service';

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
  userType: 'mentor' | 'student' | undefined;

  mentorService = inject(MentorService);
  studentService = inject(StudentService);
  userService = inject(UserService);
  userStoreService = inject(UserStoreService);
  destroyRef = inject(DestroyRef);
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.userType = this.mentor ? 'mentor' : 'student';
  }

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
    if (this.userStoreService.getUserConnected$().value.role === 'MENTOR') {
      this.mentorService
        .updateMentorProfil(newProfil.profil)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Super ! ',
            detail: 'Votre profil a bien été modifié',
          });
        });
      //
      if (newProfil.file && newProfil.fileName) {
        this.mentorService
          .updateMentorImage(newProfil.file)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }

      //
    }
    if (this.userStoreService.getUserConnected$().value.role === 'STUDENT') {
      this.studentService
        .updateStudentProfil(newProfil.profil)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Super ! ',
            detail: 'Votre profil a bien été modifié',
          });
        });
      //

      if (newProfil.file && newProfil.fileName) {
        this.studentService
          .updateStudentImage(newProfil.file)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }
      //
    }
    // if (newProfil.file && newProfil.fileName) {
    //   if (this.userStoreService.getUserConnected$().value.role === 'MENTOR') {
    //     this.mentorService
    //       .updateMentorImage(newProfil.file)
    //       .pipe(takeUntilDestroyed(this.destroyRef))
    //       .subscribe(() => {
    //         this.messageService.add({
    //           severity: 'success',
    //           summary: 'Super ! ',
    //           detail: 'Votre profil a bien été modifié',
    //         });
    //       });
    //   }
    //   if (this.userStoreService.getUserConnected$().value.role === 'STUDENT') {
    //     this.studentService
    //       .updateStudentImage(newProfil.file)
    //       .pipe(takeUntilDestroyed(this.destroyRef))
    //       .subscribe(() => {
    //         this.messageService.add({
    //           severity: 'success',
    //           summary: 'Super ! ',
    //           detail: 'Votre profil a bien été modifié',
    //         });
    //       });
    //   }
    // }

    this.userService
      .updateUserSkills(newProfil.skills)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  toggleFavorite() {
    this.isFavorite != this.isFavorite;
  }
}
