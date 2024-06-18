import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  offsetReservationMentor = new BehaviorSubject(0);
  offsetReservationStudent = new BehaviorSubject(0);
  offsetReservationMentorHistory = new BehaviorSubject(0);
  offsetReservationStudentHistory = new BehaviorSubject(0);
  constructor() {}
}
