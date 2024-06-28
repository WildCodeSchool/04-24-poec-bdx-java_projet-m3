import { Component, inject } from '@angular/core';
import { StudentService } from '../../../../shared/services/student.service';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-profil-student',
  templateUrl: './profil-student.component.html',
  styleUrl: './profil-student.component.scss',
})
export class ProfilStudentComponent {
  userService = inject(UserService);
  studentService = inject(StudentService);
  languages$ = this.userService.activeUserLanguages$;
  experiences$ = this.userService.activeUserExperiences$;
  formations$ = this.userService.activeUserFormations$;
  skills$ = this.userService.activeUserSkills$;
  profil$ = this.studentService.activeStudentProfil$;
}
