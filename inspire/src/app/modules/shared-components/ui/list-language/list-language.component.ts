import { Component, Input } from '@angular/core';
import { Language } from '../../../../shared/models/language';

@Component({
  selector: 'app-list-language',
  templateUrl: './list-language.component.html',
  styleUrl: './list-language.component.scss',
})
export class ListLanguageComponent {
  @Input() title: string = '';
  @Input() languages!: Language[];
}
