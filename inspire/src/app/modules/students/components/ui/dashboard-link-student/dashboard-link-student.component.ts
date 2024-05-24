import { Component, Input } from '@angular/core';
type DashboardLink = {
  title: string;
  logoUrl: string;
  logoUrlActive: string;
  path: string;
  active: boolean;
};

@Component({
  selector: 'app-dashboard-link-student',
  templateUrl: './dashboard-link-student.component.html',
  styleUrl: './dashboard-link-student.component.scss',
})
export class DashboardLinkStudentComponent {
  @Input() showText = true;
  listLink: DashboardLink[] = [
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
  handleLinkChange(event: boolean, index: number) {
    this.listLink.forEach((link, i) => {
      index === i ? (link.active = event) : (link.active = !event);
    });
  }
}
