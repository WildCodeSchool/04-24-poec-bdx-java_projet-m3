import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Button } from 'primeng/button';

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
  @ViewChild('btn') btn!: ElementRef;

  onclick() {
    this.btn.nativeElement.focus();
    this.onSubmit.emit();
  }
}
