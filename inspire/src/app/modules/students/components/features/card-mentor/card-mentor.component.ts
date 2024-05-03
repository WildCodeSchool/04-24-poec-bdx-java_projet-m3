import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-mentor',
  templateUrl: './card-mentor.component.html',
  styleUrl: './card-mentor.component.scss'
})
export class CardMentorComponent {

  @Input()
  mentor!: any;

}
