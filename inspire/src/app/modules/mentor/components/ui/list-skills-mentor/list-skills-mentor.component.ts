import { Component, Input } from '@angular/core';

interface Skill {
  title: string;
  date: string;
  place: string;
  url: string;
}

@Component({
  selector: 'app-list-skills-mentor',
  templateUrl: './list-skills-mentor.component.html',
  styleUrl: './list-skills-mentor.component.scss',
})
export class ListSkillsMentorComponent {
  @Input() title: string = '';
  skills: Skill[] = [
    {
      title: 'skill 1',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
    {
      title: 'skill 2',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
    {
      title: 'skill 3',
      date: '2024',
      place: 'Wild code School',
      url: 'assets/svgs/dash.svg',
    },
  ];
}