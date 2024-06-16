import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
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

  listLinkStudent: DashboardLink[] = [
    {
      title: 'Mon profil',
      logoUrl: 'assets/svgs/dash.svg',
      logoUrlActive: 'assets/svgs/dash-white.svg',
      path: 'student',
      active: true,
    },
    {
      title: 'Trouver un mentor',
      logoUrl: 'assets/svgs/calendar.svg',
      logoUrlActive: 'assets/svgs/calendar-white.svg',
      path: 'student/list-mentors',
      active: false,
    },
    {
      title: 'Mes réservations',
      logoUrl: 'assets/svgs/edit.svg',
      logoUrlActive: 'assets/svgs/edit-white.svg',
      path: 'student/reservations',
      active: false,
    },
    {
      title: 'Mes favoris',
      logoUrl: 'assets/svgs/edit.svg',
      logoUrlActive: 'assets/svgs/edit-white.svg',
      path: 'student/list-favorites',
      active: false,
    },
  ];

  mentor: boolean =
    inject(UserStoreService).getUserConnected$().value.role === 'MENTOR';

  router = inject(Router);
  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const fragments = this.router.url;
    this.mentor
      ? this.listLink.forEach((link, i) => {
          link.active =
            fragments.split('/').join('') === link.path.split('/').join('');
        })
      : this.listLink.forEach((link, i) => {
          link.active =
            fragments.split('/').join('') === link.path.split('/').join('');
        });
  }

  handleLinkChange(event: boolean, index: number) {
    this.mentor
      ? this.listLink.forEach((link, i) => {
          index === i ? (link.active = event) : (link.active = !event);
        })
      : this.listLinkStudent.forEach((link, i) => {
          index === i ? (link.active = event) : (link.active = !event);
        });
  }
}
