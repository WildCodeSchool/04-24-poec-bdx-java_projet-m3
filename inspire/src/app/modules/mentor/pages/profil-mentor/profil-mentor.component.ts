import { Component, inject } from '@angular/core';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-profil-mentor',
  templateUrl: './profil-mentor.component.html',
  styleUrl: './profil-mentor.component.scss',
})
export class ProfilMentorComponent {
  mentorService = inject(MentorService);
  languages$ = this.mentorService.activeMentorLanguages$;
  experiences$ = this.mentorService.activeMentorExperiences$;
  formations$ = this.mentorService.activeMentorFormations$;
  skills$ = this.mentorService.activeMentorSkills$;
  profil$ = this.mentorService.activeMentorProfil$;
}
