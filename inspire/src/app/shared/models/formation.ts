export type Formation = {
  title: string;
  company: string;
  dateBegin: string;
  dateEnd: string;
  city: string;
  country: string;
};

export type FormationDTO = {
  id?: number;
  title: string;
  company: string;
  dateBegin: string;
  dateEnd: string;
  city: string;
  country: string;
  userId: number;
};
