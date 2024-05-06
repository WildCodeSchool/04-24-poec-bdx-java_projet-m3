import { Component, Input } from '@angular/core';
import { Formation } from '../../../../shared/models/formation';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrl: './list-formation.component.scss',
})
export class ListFormationComponent {
  @Input() title: string = '';
  @Input() formations!: Formation[];
}
