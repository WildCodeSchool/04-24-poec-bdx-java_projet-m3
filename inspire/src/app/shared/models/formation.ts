import { Language } from './language';

export type Formation = {
  id?: string;
  userId: string;
  title: string;
  company: Language;
  dateBegin: Date;
  dateEnd: Date;
  city: string;
  country: string;
};
