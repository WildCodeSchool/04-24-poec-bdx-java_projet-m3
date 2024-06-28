import { ResolveFn } from '@angular/router';
import { NotificationDTO } from '../models/notification-dto';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { UserStoreService } from '../services/stores/user-store.service';

export const notificationResolver: ResolveFn<NotificationDTO[]> = (
  route,
  state
) => {
  const userId = inject(UserStoreService).getUserConnected$().value.id;
  console.log('user in notif ', userId);

  return inject(NotificationService).getNotificationsMentor(userId);
};
