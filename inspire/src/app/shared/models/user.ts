export class User {
  id?: string;
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
  id?: string;
  firstname: string = '';
  lastname: string = '';
  description: string = '';
  imgUrl: string = '';
  title: string = '';
  githubUrl: string = '';
  linkedinUrl: string = '';
  userId: string = '';

  constructor(
    userId: string,
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

export class Student {
  id?: string;
  firstname: string;
  lastname: string;
  description: string;
  imgUrl: string;
  title: string;
  githubUrl: string;
  linkedinUrl: string;
  userId: string;

  constructor(
    userId: string,
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
