import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NotificationService } from '../../../../../shared/services/notification.service';
import { UserStoreService } from '../../../../../shared/services/stores/user-store.service';

@Component({
  selector: 'app-notifcation-dropdown',
  templateUrl: './notifcation-dropdown.component.html',
  styleUrl: './notifcation-dropdown.component.scss',
})
export class NotifcationDropdownComponent {
  items: MenuItem[] | undefined;
  notificationService = inject(NotificationService);
  user = inject(UserStoreService).getUserConnected$();
  total = '';

  ngOnInit() {
    this.notificationService
      .getNotificationsMentor(this.user.value.id)
      .subscribe((res) => {
        this.total = res.length ? '' + res.length : '';
        const notifs = res.map((ele) => {
          return {
            label: ele.message,
            icon: ele.message.includes('Annulation')
              ? 'pi pi-times'
              : 'pi pi-plus',
          };
        });
        this.items = [
          {
            label: 'Notifications',
            items: notifs,
          },
        ];
      });
  }
}
