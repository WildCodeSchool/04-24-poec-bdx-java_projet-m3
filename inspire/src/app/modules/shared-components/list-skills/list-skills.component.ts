import { Component } from '@angular/core';

interface Skill {
  title: string;
  date: string;
  place: string;
  url: string;
}

@Component({
  selector: 'app-list-skills',
  templateUrl: './list-skills.component.html',
  styleUrl: './list-skills.component.scss',
})
export class ListSkillsComponent {
  skills: Skill[] = [
    {
      title: 'Formation 1',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
    {
      title: 'Formation 1',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
    {
      title: 'Formation 1',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
  ];
}
