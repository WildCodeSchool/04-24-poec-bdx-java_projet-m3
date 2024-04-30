import { Component, Input } from '@angular/core';
interface Skill {
  title: string;
  date: string;
  place: string;
  url: string;
}
@Component({
  selector: 'app-card-formation',
  templateUrl: './card-formation.component.html',
  styleUrl: './card-formation.component.scss',
})
export class CardFormationComponent {
  @Input() skill: Skill = {
    title: 'Développeur full-stack',
    date: '2024',
    place: 'Wild Code School',
    url: 'assets/svgs/dash.svg',
  };
}
