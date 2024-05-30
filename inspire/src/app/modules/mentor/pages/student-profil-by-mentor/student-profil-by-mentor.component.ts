import { Component, Input, inject } from '@angular/core';
import { MentorService } from '../../../../shared/services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../user.service';
import { Experience } from '../../../../shared/models/experience';
import { Formation } from '../../../../shared/models/formation';
import { StudentDTO } from '../../../../shared/models/user';
import { Skill } from '../../../../shared/models/chip';
import { Language } from '../../../../shared/models/language';

@Component({
  selector: 'app-student-profil-by-mentor',
  templateUrl: './student-profil-by-mentor.component.html',
  styleUrl: './student-profil-by-mentor.component.scss'
})
export class StudentProfilByMentorComponent {
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
  profil = this.activatedRoute.snapshot.data['profil'] as StudentDTO;
}
