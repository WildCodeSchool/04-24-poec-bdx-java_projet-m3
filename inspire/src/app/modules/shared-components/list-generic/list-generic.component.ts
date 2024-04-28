import { Component } from '@angular/core';

@Component({
  selector: 'app-list-generic',
  templateUrl: './list-generic.component.html',
  styleUrl: './list-generic.component.scss',
})
export class ListGenericComponent {
  list: any = [...Array(5)];
}
