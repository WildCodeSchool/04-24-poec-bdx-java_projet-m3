import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-languages',
  templateUrl: './list-languages.component.html',
  styleUrl: './list-languages.component.scss',
})
export class ListLanguagesComponent {
  @Input() title: string = '';
}
