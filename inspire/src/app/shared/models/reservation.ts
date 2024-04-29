import { Student } from './user';

export class Reservation {
  student: Student = {} as Student;
  promotion: string = '';
  subject: string = '';
  date: Date = new Date();
  slot: string = '';
}
