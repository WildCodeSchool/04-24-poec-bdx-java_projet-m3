export type Slot = {
  dateTime: Date;
  mentorId: number;
  visio: boolean;
};

export type SlotDTO = {
  id: number;
  mentorId: number;
  reservationId?: number;
  dateBegin: Date;
  dateEnd: Date;
  visio: boolean;
  booked: boolean;
};

export type Reservation = {
  subject: string;
  message?: string;
  studentId: number;
  slotId: number;
};

export type ReservationForStudentDTO = {
  id: number;
  mentorId: number;
  slotId: number;
  userId: number;
  message: string;
  subject: string;
  dateBegin: Date;
  visio: boolean;
  title: string;
  firstName: string;
  lastName: string;
  imgUrl: string;
};

export type reservationForMentorDTO = {
  id: number;
  studentId: number;
  slotId: number;
  userId: number;
  message: string;
  subject: string;
  dateBegin: Date;
  visio: boolean;
  title: string;
  firstName: string;
  lastName: string;
  imgUrl: string;
};
