import { Language } from './language';

export type Experience = {
  id?: string;
  userId: number;
  title: string;
  company: string;
  dateBegin: string;
  dateEnd: string;
  city: string;
  country: string;
};
