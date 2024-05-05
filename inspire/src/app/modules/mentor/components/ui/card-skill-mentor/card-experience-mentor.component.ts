import { Component, Input } from '@angular/core';
import { Experience } from '../../../../../shared/models/experience';

@Component({
  selector: 'app-card-experience-mentor',
  templateUrl: './card-experience-mentor.component.html',
  styleUrl: './card-experience-mentor.component.scss',
})
export class CardExperienceComponent {
  @Input() experience!: Experience;
}
