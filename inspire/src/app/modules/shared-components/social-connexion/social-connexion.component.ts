import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-connexion',
  templateUrl: './social-connexion.component.html',
  styleUrl: './social-connexion.component.scss',
})
export class SocialConnexionComponent {
  @Input()
  title!: string;
}
