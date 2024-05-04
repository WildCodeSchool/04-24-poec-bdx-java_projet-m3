export class User {
  id?: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
export class Mentor extends User {
  firstname: string = '';
  lastname: string = '';
  description: string = '';

  constructor(
    email: string,
    password: string,
    role: string,
    firstname: string,
    lastname: string,
    description: string
  ) {
    super(email, password, role);
    this.firstname = firstname;
    this.lastname = lastname;
    this.description = description;
  }
}

export class Student2 extends User {
  firstname: string = '';
  lastname: string = '';
  description: string = '';

  constructor(
    email: string,
    password: string,
    role: string,
    firstname: string,
    lastname: string,
    description: string
  ) {
    super(email, password, role);
    this.firstname = firstname;
    this.lastname = lastname;
    this.description = description;
  }
}

export class Student {
  id: string = '';
  firstname: string = '';
  lastname: string = '';
  description: string = '';
  imgUrl: string = '';
  title: string = '';
  github: string = '';
  linkedinUrl: string = '';
  userId: string = '';
  user: User;

  constructor(
    id: string,
    userId: string,
    user: User,
    firstname: string,
    lastname: string,
    description: string,
    imgUrl: string,
    title: string,
    github: string,
    linkedinUrl: string
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.firstname = firstname;
    this.lastname = lastname;
    this.description = description;
    this.imgUrl = imgUrl;
    this.title = title;
    this.github = github;
    this.linkedinUrl = linkedinUrl;
  }
}
