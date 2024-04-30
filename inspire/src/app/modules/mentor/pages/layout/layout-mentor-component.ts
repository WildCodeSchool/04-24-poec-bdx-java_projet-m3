import { Component, Input } from '@angular/core';
import { Mentor } from '../../../../shared/models/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './layout-mentor-component.html',
  styleUrl: './layout-mentor-component.scss',
})
export class LayoutMentor {
  showNavbar = true;

  @Input()
  user: Mentor = {
    firstname: 'mahdi',
    lastname: 'mcheik',
    email: 'mahdi@wcs.com',
    password: '1234',
    description: '',
    role: 'mentor',
  };

  toggleVisibility() {
    this.showNavbar = !this.showNavbar;
    console.log(this.showNavbar);
  }
}
