import { Skill } from './chip';
import { Experience } from './experience';
import { Formation } from './formation';
import { Language } from './language';

export class User {
  id?: number;
  userId?: number;
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export class Mentor {
  id?: number;
  firstname: string = '';
  lastname: string = '';
  description: string = '';
  imgUrl: string = '';
  title: string = '';
  githubUrl: string = '';
  linkedinUrl: string = '';
  userId: number;

  constructor(
    userId: number,
    firstname: string,
    lastname: string,
    description: string,
    imgUrl: string,
    title: string,
    githubUrl: string,
    linkedinUrl: string
  ) {
    this.userId = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.description = description;
    this.imgUrl = imgUrl;
    this.title = title;
    this.githubUrl = githubUrl;
    this.linkedinUrl = linkedinUrl;
  }
}

export type MentorFullProfil = {
  profil: Mentor;
  languages: Language[];
  formations: Formation[];
  experiences: Experience[];
  skills: Skill[];
};

export class Student {
  id?: number;
  firstname: string;
  lastname: string;
  description: string;
  imgUrl: string;
  title: string;
  githubUrl: string;
  linkedinUrl: string;
  userId: number;
  promotion?: string = 'javascript';

  constructor(
    userId: number,
    firstname: string,
    lastname: string,
    description: string = '',
    imgUrl: string = '',
    title: string = '',
    githubUrl: string = '',
    linkedinUrl: string = ''
  ) {
    this.userId = userId;
    this.firstname = firstname;
    this.lastname = lastname;
    this.description = description;
    this.imgUrl = imgUrl;
    this.title = title;
    this.githubUrl = githubUrl;
    this.linkedinUrl = linkedinUrl;
  }
}
