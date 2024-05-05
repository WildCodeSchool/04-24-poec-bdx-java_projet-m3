import { Component, inject } from '@angular/core';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-profil-mentor',
  templateUrl: './profil-mentor.component.html',
  styleUrl: './profil-mentor.component.scss',
})
export class ProfilMentorComponent {
  activeMentor$ = inject(MentorService).activeMentor$;
}
