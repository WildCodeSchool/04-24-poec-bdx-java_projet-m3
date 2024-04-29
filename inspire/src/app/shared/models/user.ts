export class User {
  email: string = '';
  password: string = '';
  role: string = '';
}
export class Mentor extends User {
  constructor() {
    super();
  }
  firstname: string = '';
  lastname: string = '';
  description: string = '';
}

export class Student extends User {
  constructor() {
    super();
  }
  firstname: string = '';
  lastname: string = '';
  description: string = '';
}
