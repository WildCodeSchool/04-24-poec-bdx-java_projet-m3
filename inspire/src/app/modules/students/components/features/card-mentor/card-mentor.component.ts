import { Component, Input, OnInit, inject } from '@angular/core';
import { Mentor } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-mentor',
  templateUrl: './card-mentor.component.html',
  styleUrl: './card-mentor.component.scss'
})
export class CardMentorComponent implements OnInit {

  @Input()
  mentor!: Mentor;

  skillList$?: Observable<Skill[]>;
  mentorService = inject(MentorService);



   ngOnInit(): void {
    this.skillList$ = this.mentorService.getMentorSkillsById(this.mentor.userId)
     console.log("mentor:", this.mentor)
   }

}
