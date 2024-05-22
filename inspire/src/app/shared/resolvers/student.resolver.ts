import { ResolveFn } from '@angular/router';
import { Student } from '../models/user';
import { inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { Language } from '../models/language';
import { Skill } from '../models/chip';
import { Experience } from '../models/experience';

export const studentProfilResolver: ResolveFn<Student> = (route, state) => {
  return inject(StudentService).getStudentProfil();
};
export const studentLanguagesResolver: ResolveFn<Observable<Language[]>> = (
  route,
  state
) => {
  return inject(UserService).getStudentLanguages();
};

export const studentSkillsResolver: ResolveFn<Skill[]> = (route, state) => {
  return inject(UserService).getMentorSkills();
};
