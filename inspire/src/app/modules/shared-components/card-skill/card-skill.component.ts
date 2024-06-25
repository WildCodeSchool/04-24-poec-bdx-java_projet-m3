import { Component, Input } from '@angular/core';
interface Skill {
  title: string;
  date: string;
  place: string;
  url: string;
}
@Component({
  selector: 'app-card-skill',
  templateUrl: './card-skill.component.html',
  styleUrl: './card-skill.component.scss',
})
export class CardSkillComponent {
  @Input() skill: Skill = {
    title: 'Développeur full-stack',
    date: '2024',
    place: 'Wild Code School',
    url: 'assets/svgs/dash.svg',
  };
}
