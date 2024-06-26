import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { DashboardLink } from '../../../shared/models/dashboardLink';
@Component({
  selector: 'app-dashboard-links',
  templateUrl: './dashboard-links.component.html',
  styleUrl: './dashboard-links.component.scss',
})
export class DashboardLinksComponent implements OnInit {
  @Input() showText = true;
  @Input() listLink: DashboardLink[] = [];

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

    this.router.events.subscribe((res) => {
      if (res instanceof NavigationStart) {
        console.log('Navigation', res);
        this.listLink.forEach((link) => {
          link.active = res.url === '/' + link.path;
        });
      }
    });
  }

  handleLinkChange(event: boolean, index: number) {
    this.mentor
      ? this.listLink.forEach((link, i) => {
          index === i ? (link.active = event) : (link.active = !event);
        })
      : this.listLink.forEach((link, i) => {
          index === i ? (link.active = event) : (link.active = !event);
        });
  }
}
