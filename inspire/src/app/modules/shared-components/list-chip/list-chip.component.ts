import { Component, Input } from '@angular/core';
import { ChipComponent } from '../chip/chip.component';
import { Skill } from '../../../shared/models/chip';

@Component({
  selector: 'app-list-chip',
  templateUrl: './list-chip.component.html',
  styleUrl: './list-chip.component.scss',
})
export class ListChipComponent {
  @Input() chips!: Skill[];
  @Input() dark: boolean = false;
}
