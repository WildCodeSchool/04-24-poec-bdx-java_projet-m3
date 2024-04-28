import { Component } from '@angular/core';
type DashboardLink = {
  title: string;
  logoUrl: string;
  path: string;
  active: boolean;
};
@Component({
  selector: 'app-dashboard-links',
  templateUrl: './dashboard-links.component.html',
  styleUrl: './dashboard-links.component.scss',
})
export class DashboardLinksComponent {
  listLink: DashboardLink[] = [
    {
      title: 'dashboard',
      logoUrl: 'assets/svgs/dash.svg',
      path: '',
      active: true,
    },
    {
      title: 'mon profil',
      logoUrl: 'assets/svgs/calendar.svg',
      path: '',
      active: false,
    },
    {
      title: 'agenda',
      logoUrl: 'assets/svgs/edit.svg',
      path: '',
      active: false,
    },
  ];
  handleLinkChange(event: boolean, index: number) {
    this.listLink.forEach((link, i) => {
      index === i ? (link.active = event) : (link.active = !event);
    });
  }
}
