import { Student } from './user';

export class Reservation {
  subject: string = '';
  message?: string = '';
  mentorId: string = '';
  slotId: string = '';
}

export class ReservationDTO {
  id: number = 0;
  subject: string = '';
  message?: string = '';
  mentorId: string = '';
  slotId: string = '';
}

export type Slot = {
  dateTime: Date;
  mentorId: number;
  visio: boolean;
};

export type SlotDTO = {
  id: number;
  dateTime: Date;
  mentorId: number;
  visio: boolean;
};

export type reservationForMentorDTO = {
  studentId: number;
  slotId: number;
  userId: number;
  message: string;
  subject: string;
  dateTime: Date;
  visio: boolean;
  title: string;
  firstname: string;
  lastname: string;
  imgUrl: string;
};
