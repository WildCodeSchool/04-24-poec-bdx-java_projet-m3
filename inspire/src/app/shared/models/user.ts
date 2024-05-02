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

export class Student extends User {
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
