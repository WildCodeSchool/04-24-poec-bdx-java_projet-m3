import { Component, inject } from '@angular/core';

import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent {
  activeMentor$ = inject(MentorService).activeMentor$;
}
