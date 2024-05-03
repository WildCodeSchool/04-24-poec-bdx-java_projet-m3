import { Component, Input } from '@angular/core';
interface Skill {
  title: string;
  date: string;
  place: string;
  url: string;
}
@Component({
  selector: 'app-card-skill-mentor',
  templateUrl: './card-skill-mentor.component.html',
  styleUrl: './card-skill-mentor.component.scss',
})
export class CardSkillComponent {
  @Input() skill: Skill = {
    title: 'Développeur full-stack',
    date: '2024',
    place: 'Wild Code School',
    url: 'assets/svgs/dash.svg',
  };
}
