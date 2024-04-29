import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.scss',
})
export class NavbarButtonComponent {
  @Input()
  text!: string;
  @Input()
  logoUrl!: string;
  @Input() active: boolean = false;

  @Input()
  variant!: 'light' | 'dark' | 'lightActive' | 'darkActive';

  @Output() stateEmitter = new EventEmitter<boolean>();

  changeState() {
    this.active = true;
    this.stateEmitter.emit(this.active);
  }
}
