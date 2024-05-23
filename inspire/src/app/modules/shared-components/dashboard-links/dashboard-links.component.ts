import { Component, Input } from '@angular/core';
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
export class DashboardLinksComponent {
  @Input() showText = true;
  @Input() listLink: DashboardLink[] = [
    {
      title: 'dashboard',
      logoUrl: 'assets/svgs/dash.svg',
      logoUrlActive: 'assets/svgs/dash-white.svg',
      path: 'mentor',
      active: true,
    },
    {
      title: 'mon profil',
      logoUrl: 'assets/svgs/calendar.svg',
      logoUrlActive: 'assets/svgs/calendar-white.svg',
      path: 'mentor/profil',
      active: false,
    },
    {
      title: 'agenda',
      logoUrl: 'assets/svgs/edit.svg',
      logoUrlActive: 'assets/svgs/edit-white.svg',
      path: 'mentor/agenda',
      active: false,
    },
  ];
  handleLinkChange(event: boolean, index: number) {
    this.listLink.forEach((link, i) => {
      index === i ? (link.active = event) : (link.active = !event);
    });
  }
}
