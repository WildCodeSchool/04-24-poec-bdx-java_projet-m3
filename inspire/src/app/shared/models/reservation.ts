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
  firstname: string;
  lastname: string;
  imgUrl: string;
  subject: string;
};

export type Reservation = {
  subject: string;
  message?: string;
  studentId: number;
  slotId: number;
};

export type ReservationForStudentDTO = {
  id: number;
  reservationId: number;
  mentorId: number;
  slotId: number;
  userId: number;
  message: string;
  subject: string;
  dateBegin: Date;
  visio: boolean;
  title: string;
  firstname: string;
  lastname: string;
  imgUrl: string;
};

export type reservationForMentorDTO = {
  id: number;
  reservationId: number;
  studentId: number;
  slotId: number;
  userId: number;
  message: string;
  subject: string;
  dateBegin: Date;
  visio: boolean;
  title: string;
  firstname: string;
  lastname: string;
  imgUrl: string;
};
