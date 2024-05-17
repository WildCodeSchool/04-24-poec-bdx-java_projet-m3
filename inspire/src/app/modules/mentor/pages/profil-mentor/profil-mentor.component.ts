import { Component, inject } from '@angular/core';
import { MentorService } from '../../../../shared/services/mentor.service';
import { UserService } from '../../../../user.service';

@Component({
  selector: 'app-profil-mentor',
  templateUrl: './profil-mentor.component.html',
  styleUrl: './profil-mentor.component.scss',
})
export class ProfilMentorComponent {
  userService = inject(UserService);
  mentorService = inject(MentorService);
  languages$ = this.userService.activeMentorLanguages$;
  experiences$ = this.userService.activeMentorExperiences$;
  formations$ = this.userService.activeMentorFormations$;
  skills$ = this.userService.activeMentorSkills$;
  profil$ = this.mentorService.activeMentorProfil$;
}
