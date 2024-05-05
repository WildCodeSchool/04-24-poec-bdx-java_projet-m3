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
  // http://localhost:3000/students?userId=b362
  // http://localhost:3000/reservations?_embed=slot&slot.userId=b362&_embed=user
  getMentorReservationList(id: string) {
    return this.httpClient
      .get<ResponseReservation[]>(
        environment.BASE_URL +
          `/reservations?_embed=slot&_embed=user?slot.userId=${id}&_embed=user`
      )
      .pipe(
        tap((res) => console.log('reservation ', res)),
        switchMap((res) => {
          const students$ = res.map((ele) =>
            this.httpClient
              .get<Student[]>(
                environment.BASE_URL + `/students?userId=${ele.userId}`
              )
              .pipe(
                map((res) => {
                  return {
                    student: res[0],
                    slotId: '',
                    userId: '',
                    message: '',
                    subject: '',
                    slot: ele.slot,
                  } as ResponseReservation;
                })
              )
          );
          return forkJoin(students$);
        }),
        tap((res) => console.log('all students resrvations ', res))
      );
  }
}
