import { Component, Input } from '@angular/core';
import { Experience } from '../../../../../shared/models/experience';

@Component({
  selector: 'app-list-experience-mentor',
  templateUrl: './list-experience-mentor.component.html',
  styleUrl: './list-experience-mentor.component.scss',
})
export class ListExperienceMentorComponent {
  @Input() title: string = '';
  @Input() experiences!: Experience[];
}
