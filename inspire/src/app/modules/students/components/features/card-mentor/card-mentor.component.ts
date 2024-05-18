import { Component, Input, OnInit, inject } from '@angular/core';
import { Mentor } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { Observable } from 'rxjs';
import { UserService } from '../../../../../user.service';

@Component({
  selector: 'app-card-mentor',
  templateUrl: './card-mentor.component.html',
  styleUrl: './card-mentor.component.scss',
})
export class CardMentorComponent implements OnInit {
  @Input() mentor!: Mentor;

  skillList$?: Observable<Skill[]>;
  userService = inject(UserService);

  ngOnInit(): void {
    this.skillList$ = this.userService.getMentorSkillsById(this.mentor.userId);
  }
}
