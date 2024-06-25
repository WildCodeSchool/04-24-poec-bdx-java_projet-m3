import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-button',
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.scss',
})
export class NavbarButtonComponent {
  @Input()
  path: string = '';
  @Input()
  text!: string;
  @Input()
  logoUrl!: string;
  @Input()
  logoUrlActive!: string;
  @Input() active: boolean = false;
  @Input()
  variant!: 'light' | 'dark' | 'lightActive' | 'darkActive';
  @Input() showText = false;

  @Output() stateEmitter = new EventEmitter<boolean>();
  router = inject(Router);
  changeState() {
    this.active = true;
    this.stateEmitter.emit(this.active);
    this.router.navigateByUrl(this.path);
  }
}
