import { ResolveFn } from '@angular/router';
import { Student } from '../models/user';
import { inject } from '@angular/core';
import { StudentService } from '../services/student.service';

export const studentProfilResolver: ResolveFn<Student> = (route, state) => {
  return inject(StudentService).getStudentProfil();
};
