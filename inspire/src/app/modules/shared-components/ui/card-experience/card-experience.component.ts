import { Component, Input } from '@angular/core';
import { Experience } from '../../../../shared/models/experience';

@Component({
  selector: 'app-card-experience',
  templateUrl: './card-experience.component.html',
  styleUrl: './card-experience.component.scss',
})
export class CardExperienceComponent {
  @Input() experience!: Experience;
}
