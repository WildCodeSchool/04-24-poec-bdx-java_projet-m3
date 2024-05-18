import { Component, OnInit, inject } from '@angular/core';
import { MentorService } from '../../../../shared/services/mentor.service';
import { ResponseReservation } from '../../../../shared/models/reservation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  reservations!: ResponseReservation[];

  mentorService = inject(MentorService);

  ngOnInit(): void {}
}
