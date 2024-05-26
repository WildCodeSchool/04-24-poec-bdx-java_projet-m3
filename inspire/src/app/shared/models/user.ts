export class User {
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}

export type UserDTO = {
  id: number;
  email: string;
  password: string;
  role: string;
};

export class Mentor {
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

export type MentorDTO = {
  id: number;
  firstname: string;
  lastname: string;
  description: string;
  imgUrl: string;
  title: string;
  githubUrl: string;
  linkedinUrl: string;
  userId: number;
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

export type StudentDTO = {
  id: number;
  firstname: string;
  lastname: string;
  description: string;
  imgUrl: string;
  title: string;
  githubUrl: string;
  linkedinUrl: string;
  userId: number;
};
