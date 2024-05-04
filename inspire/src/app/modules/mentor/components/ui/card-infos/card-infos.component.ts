import { Component, Input, OnInit, inject } from '@angular/core';
import { Mentor } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-card-infos',
  templateUrl: './card-infos.component.html',
  styleUrl: './card-infos.component.scss',
})
export class CardInfosComponent implements OnInit {
  @Input() mentor!: Mentor;
  @Input() chips!: Skill[];
  chips$!: Observable<Skill[]>;

  mentorService = inject(MentorService);

  ngOnInit(): void {
    this.chips$ = this.mentorService.getMentorSkills(
      this.mentorService.activeMentor$.value.userId
    );
  }
}
