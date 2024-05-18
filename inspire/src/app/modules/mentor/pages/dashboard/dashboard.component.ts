import { Component, inject } from '@angular/core';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  mentorService = inject(MentorService);
}
