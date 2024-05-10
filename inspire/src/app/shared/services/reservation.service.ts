import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Subject, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ResponseReservation, Slot } from '../models/reservation';
import { Student } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  httpClient = inject(HttpClient);

  constructor() {}
  getMentorReservationList(id: number) {
    return this.httpClient.get<ResponseReservation[]>(
      environment.BASE_URL + `/reservation/reservations/mentor/${id}`
    );
  }
}
