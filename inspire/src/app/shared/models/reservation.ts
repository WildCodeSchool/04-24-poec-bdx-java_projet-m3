import { Student } from './user';

export class Reservation {
  id?: string = '';
  subject: string = '';
  message?: string = '';
  mentorId: string = '';
  slotId: string = '';
}

export type Slot = {
  id?: string;
  dateTime: Date;
  mentorId: number;
  visio: boolean;
};

export class ResponseReservation {
  id?: string = '';
  slotId?: number;
  userId?: number;
  message?: string = '';
  subject: string = '';
  slot: Slot = {} as Slot;
  student: Student = {} as Student;
}
