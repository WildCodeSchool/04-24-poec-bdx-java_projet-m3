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

export type Reservation = {
  subject: string;
  message?: string;
  mentorId: string;
  slotId: string;
};

export type ReservationForStudentDTO = {
  id: number;
  mentorId: number;
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

export type reservationForMentorDTO = {
  id: number;
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
