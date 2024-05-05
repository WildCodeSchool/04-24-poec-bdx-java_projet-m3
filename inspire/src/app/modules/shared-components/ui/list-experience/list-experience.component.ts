import { Component, Input } from '@angular/core';
import { Experience } from '../../../../shared/models/experience';

@Component({
  selector: 'app-list-experience',
  templateUrl: './list-experience.component.html',
  styleUrl: './list-experience.component.scss',
})
export class ListExperienceComponent {
  @Input() title: string = '';
  @Input() experiences!: Experience[];
}
