import { Component } from '@angular/core';
import { Skill } from '../../../../../shared/models/chip';


@Component({
  selector: 'app-filter-search-list',
  templateUrl: './filter-search-list.component.html',
  styleUrl: './filter-search-list.component.scss'
})
export class FilterSearchListComponent {

  skills!: Skill[];
  mode!: any[];
  level!: any [];

  selectedSkill!: Skill[];
  selectedMode!: any[];
  selectedLevel!: any[];

  constructor() {
      this.skills = [
          {name: 'JavaScript'},
          {name: 'Java'},
          {name: 'Angular'},
          {name: 'React'},
          {name: 'CSS'}
      ];
      this.mode = [
        { name: 'Presentiel'},
        { name: 'Distanciel'},
    ];
    this.level = [
      { name: "Moins d'un an"},
      { name: "Entre 1 et 2 ans"},
      { name: "Entre 2 et 5 ans"},
  ];
  }


}
