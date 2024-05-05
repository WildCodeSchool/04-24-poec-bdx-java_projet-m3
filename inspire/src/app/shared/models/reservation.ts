import { Student } from './user';

export class Reservation {
  id?: string = '';
  subject: string = '';
  message: string = '';
  userId: string = '';
  slotId: string = '';
}

export type Slot = {
  id?: string;
  date: string;
  startAt: string;
  userId: string;
  vision: boolean;
};

export class ResponseReservation {
  id?: string = '';
  slotId: string = '';
  userId: string = '';
  message: string = '';
  subject: string = '';
  slot: Slot = {} as Slot;
  student: Student = {} as Student;
}
