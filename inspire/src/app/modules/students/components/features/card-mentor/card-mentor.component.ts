import { Component, Input } from '@angular/core';
import { Mentor } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';

@Component({
  selector: 'app-card-mentor',
  templateUrl: './card-mentor.component.html',
  styleUrl: './card-mentor.component.scss'
})
export class CardMentorComponent {

  @Input()
  mentor!: Mentor;

  @Input() chips!: Skill[];

}
