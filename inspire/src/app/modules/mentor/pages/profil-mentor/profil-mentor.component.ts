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
  languages$ = this.userService.activeUserLanguages$;
  experiences$ = this.userService.activeUserExperiences$;
  formations$ = this.userService.activeUserFormations$;
  skills$ = this.userService.activeUserSkills$;
  profil$ = this.mentorService.activeMentorProfil$;
}
