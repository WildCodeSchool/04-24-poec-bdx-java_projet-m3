import { Component, OnInit, inject } from '@angular/core';
import { WindowWatcherService } from '../../../../shared/services/window-watcher.service';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './layout-mentor-component.html',
  styleUrl: './layout-mentor-component.scss',
})
export class LayoutMentor implements OnInit {
  showNavbar = true;

  windowWatcher = inject(WindowWatcherService);
  // b362
  mentor$ = inject(MentorService).getMentorById('f4cf');
  mentorS$ = inject(MentorService).activeMentor$;

  toggleVisibility() {
    this.showNavbar = !this.showNavbar;
    console.log(this.showNavbar);
  }

  ngOnInit(): void {
    this.windowWatcher.windowSizeChanged.subscribe((option) => {
      this.showNavbar = option;
    });
  }
}
