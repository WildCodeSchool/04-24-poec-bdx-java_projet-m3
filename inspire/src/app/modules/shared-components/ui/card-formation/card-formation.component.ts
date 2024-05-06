import { Component, Input } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';

@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrl: './card-formation.component.scss',
})
export class CardFormationComponent {
  @Input() formation!: Formation;
  isVisibleFormEditCourse = false;

  showEditForm() {
    this.isVisibleFormEditCourse = true;
  }
}
