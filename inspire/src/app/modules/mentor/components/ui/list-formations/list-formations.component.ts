import { Component, Input } from '@angular/core';

interface Skill {
  title: string;
  date: string;
  place: string;
  url: string;
}

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formations.component.html',
  styleUrl: './list-formations.component.scss',
})
export class ListFormationsComponent {
  @Input() title: string = '';
  skills: Skill[] = [
    {
      title: 'Formation 1',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
    {
      title: 'Formation 2',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
    {
      title: 'Formation 3',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
  ];
}
