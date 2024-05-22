import { Component, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { StudentService } from '../../../../shared/services/student.service';

@Component({
  selector: 'app-profil-student',
  templateUrl: './profil-student.component.html',
  styleUrl: './profil-student.component.scss',
})
export class ProfilStudentComponent {
  userService = inject(UserService);
  studentService = inject(StudentService);
  languages$ = this.userService.activeMentorLanguages$;
  experiences$ = this.userService.activeMentorExperiences$;
  formations$ = this.userService.activeMentorFormations$;
  skills$ = this.userService.activeMentorSkills$;
  profil$ = this.studentService.activeStudentProfil$;
}
