import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() type: string = 'button';
  @Input() variant!: 'pink' | 'black';

  @Output() onSubmit = new EventEmitter();
}
