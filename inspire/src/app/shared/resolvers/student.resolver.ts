import { ResolveFn } from '@angular/router';
import { Student } from '../models/user';
import { inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Skill } from '../models/chip';
import { Experience } from '../models/experience';
import { Formation } from '../models/formation';
import { Observable, tap } from 'rxjs';
import { Language } from '../models/language';
import { UserByIdService } from '../services/user-by-id.service';
import { UserService } from '../services/user.service';

export const studentProfilResolver: ResolveFn<Student> = (route, state) => {
  return inject(StudentService).getStudentProfil();
};
export const studentLanguagesResolver: ResolveFn<Observable<Language[]>> = (
  route,
  state
) => {
  return inject(UserService).getUserLanguages();
};

export const studentSkillsResolver: ResolveFn<Skill[]> = (route, state) => {
  return inject(UserService).getUserSkills();
};

export const studentFormationsResolver: ResolveFn<Formation[]> = (
  route,
  state
) => {
  return inject(UserService).getUserFormations();
};

export const studentExperiencesResolver: ResolveFn<Experience[]> = (
  route,
  state
) => {
  return inject(UserService).getUserExperiences();
};

export const studentProfilByIdResolver: ResolveFn<Student> = (route, state) => {
  const userId: number = +route.params['userId'];
  console.log('Resolving student profile for userId:', userId);
  return inject(UserByIdService)
    .getStudentProfilById(userId)
    .pipe(tap((data) => console.log('Resolved student profile data:', data)));
};

export const studentLanguagesByIdResolver: ResolveFn<Observable<Language[]>> = (
  route,
  state
) => {
  const userId: number = +route.params['userId'];
  console.log('Resolving student languages for userId:', userId);
  return inject(UserByIdService)
    .getUserLanguagesById(userId)
    .pipe(tap((data) => console.log('Resolved student languages data:', data)));
};

export const studentSkillsByIdResolver: ResolveFn<Skill[]> = (route, state) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getUserSkillsById(userId);
};

export const studentExperiencesByIdResolver: ResolveFn<Experience[]> = (
  route,
  state
) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getUserExperiencesById(userId);
};

export const studentFormationsByIdResolver: ResolveFn<Formation[]> = (
  route,
  state
) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getUserFormationsById(userId);
};
