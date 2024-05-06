import { Language } from './language';

export type Experience = {
  id?: string;
  userId: string;
  title: string;
  company: Language;
  dateBegin: Date;
  dateEnd: Date;
  city: string;
  country: string;
};
