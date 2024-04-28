import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  @Input()
  user: User = {
    firstname: 'mahdi',
    lastname: 'mcheik',
    email: 'mahdi@wcs.com',
    password: '1234',
    isMentor: true,
  };
}
