import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { NotificationDTO } from '../models/notification-dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifcationsMentor$ = new BehaviorSubject<NotificationDTO[]>([]);
  http = inject(HttpClient);
  constructor() {}

  getNotificationsMentor(userId: number) {
    return this.http
      .get<NotificationDTO[]>(
        environment.BASE_URL_API + '/notification/get/user/' + userId
      )
      .pipe(
        tap((res) => {
          console.log('notifications ', res);
          this.notifcationsMentor$.next(res);
        })
      );
  }

  resetNotificationsMentor(userId: number) {
    return this.http.get<NotificationDTO[]>(
      environment.BASE_URL_API + '/notification/reset/' + userId
    );
  }
}
