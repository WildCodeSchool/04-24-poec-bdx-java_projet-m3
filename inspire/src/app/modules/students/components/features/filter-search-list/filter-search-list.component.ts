import { Component } from '@angular/core';
import { Skill } from '../../../../../shared/models/chip';


@Component({
  selector: 'app-filter-search-list',
  templateUrl: './filter-search-list.component.html',
  styleUrl: './filter-search-list.component.scss'
})
export class FilterSearchListComponent {

  skills!: Skill[];

  selectedSkill!: Skill[];

  constructor() {
      this.skills = [
          {name: 'JavaScript'},
          {name: 'Java'},
          {name: 'Angular'},
          {name: 'React'},
          {name: 'CSS'}
      ];
  }


}
