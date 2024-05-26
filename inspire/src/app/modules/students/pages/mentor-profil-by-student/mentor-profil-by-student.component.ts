import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../../../user.service';
import { MentorService } from '../../../../shared/services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { Language } from '../../../../shared/models/language';
import { Mentor, MentorDTO } from '../../../../shared/models/user';
import { Experience } from '../../../../shared/models/experience';
import { Formation } from '../../../../shared/models/formation';
import { Skill } from '../../../../shared/models/chip';

@Component({
  selector: 'app-mentor-profil-by-student',
  templateUrl: './mentor-profil-by-student.component.html',
  styleUrl: './mentor-profil-by-student.component.scss',
})
export class MentorProfilByStudentComponent {
  @Input() editModeOn: boolean = false;
  userService = inject(UserService);
  studentService = inject(MentorService);
  activatedRoute = inject(ActivatedRoute);

  languages = this.activatedRoute.snapshot.data['languages'] as Language[];
  experiences = this.activatedRoute.snapshot.data[
    'experiences'
  ] as Experience[];
  formations = this.activatedRoute.snapshot.data['formations'] as Formation[];
  skills = this.activatedRoute.snapshot.data['skills'] as Skill[];
  profil = this.activatedRoute.snapshot.data['profil'] as MentorDTO;
}
