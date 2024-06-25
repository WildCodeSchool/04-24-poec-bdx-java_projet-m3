import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-role',
  templateUrl: './card-role.component.html',
  styleUrl: './card-role.component.scss',
})
export class CardRoleComponent {
  @Input()
  title!: string;
  @Input()
  subtitle!: string;
  @Input()
  link!: string;
  @Input()
  imgCard!: string;
}
