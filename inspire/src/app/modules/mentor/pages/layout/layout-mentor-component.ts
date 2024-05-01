import { Component, Input, OnInit, inject } from '@angular/core';
import { Mentor } from '../../../../shared/models/user';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './layout-mentor-component.html',
  styleUrl: './layout-mentor-component.scss',
})
export class LayoutMentor implements OnInit {
  showNavbar = true;

  windowWatcher = inject(WindowWatcherService);
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

  ngOnInit(): void {
    this.windowWatcher.windowSizeChanged.subscribe((option) => {
      console.log('size changed');

      this.showNavbar = option;
    });
  }
}
