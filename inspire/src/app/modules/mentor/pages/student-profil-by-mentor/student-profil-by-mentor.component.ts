import { Component, Input, inject } from '@angular/core';
import { MentorService } from '../../../../shared/services/mentor.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../user.service';
import { Experience, ExperienceDTO } from '../../../../shared/models/experience';
import { Formation, FormationDTO } from '../../../../shared/models/formation';
import { Student, StudentDTO } from '../../../../shared/models/user';
import { Skill } from '../../../../shared/models/chip';
import { Language } from '../../../../shared/models/language';
import { StudentService } from '../../../../shared/services/student.service';

@Component({
  selector: 'app-student-profil-by-mentor',
  templateUrl: './student-profil-by-mentor.component.html',
  styleUrl: './student-profil-by-mentor.component.scss'
})
export class StudentProfilByMentorComponent {
  @Input() editModeOn: boolean = false;
  userService = inject(UserService);
  mentorService = inject(StudentService);
  activatedRoute = inject(ActivatedRoute);

  languages = this.activatedRoute.snapshot.data['languages'] as Language[];
  experiences = this.activatedRoute.snapshot.data[
    'experiences'
  ] as ExperienceDTO[];
  formations = this.activatedRoute.snapshot.data['formations'] as FormationDTO[];
  skills = this.activatedRoute.snapshot.data['skills'] as Skill[];
  profil = this.activatedRoute.snapshot.data['profil'] as StudentDTO;

  ngOnInit(): void {

    this.languages = this.activatedRoute.snapshot.data['languages'];
    this.experiences = this.activatedRoute.snapshot.data['experiences'];
    this.formations = this.activatedRoute.snapshot.data['formations'];
    this.skills = this.activatedRoute.snapshot.data['skills'];
    this.profil = this.activatedRoute.snapshot.data['profil'];

    console.log('Languages:', this.languages);
    console.log('Experiences:', this.experiences);
    console.log('Formations:', this.formations);
    console.log('Skills:', this.skills);
    console.log('Profil:', this.profil);
  }
  
}
