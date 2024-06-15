import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
type DashboardLink = {
  title: string;
  logoUrl: string;
  logoUrlActive: string;
  path: string;
  active: boolean;
};
@Component({
  selector: 'app-dashboard-links',
  templateUrl: './dashboard-links.component.html',
  styleUrl: './dashboard-links.component.scss',
})
export class DashboardLinksComponent implements OnInit {
  @Input() showText = true;
  @Input() listLink: DashboardLink[] = [
    {
      title: 'dashboard',
      logoUrl: 'assets/svgs/tdb.svg',
      logoUrlActive: 'assets/svgs/dash-blanc.svg',
      path: 'mentor',
      active: true,
    },
    {
      title: 'mon profil',
      logoUrl: 'assets/svgs/profile.svg',
      logoUrlActive: 'assets/svgs/profile-blanc.svg',
      path: 'mentor/profil',
      active: false,
    },
    {
      title: 'agenda',
      logoUrl: 'assets/svgs/agenda.svg',
      logoUrlActive: 'assets/svgs/agenda-blanc.svg',
      path: 'mentor/agenda',
      active: false,
    },
  ];

  router = inject(Router);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const fragments = this.router.url;
    this.listLink.forEach((link, i) => {
      link.active =
        fragments.split('/').join('') === link.path.split('/').join('');
    });
  }

  handleLinkChange(event: boolean, index: number) {
    this.listLink.forEach((link, i) => {
      index === i ? (link.active = event) : (link.active = !event);
    });
  }
}
