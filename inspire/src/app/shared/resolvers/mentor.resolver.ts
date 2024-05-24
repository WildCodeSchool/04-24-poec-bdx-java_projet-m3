import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MentorService } from '../services/mentor.service';
import { Language } from '../models/language';
import { Mentor } from '../models/user';
import { Skill } from '../models/chip';
import { Experience } from '../models/experience';
import { Formation } from '../models/formation';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';
import { UserByIdService } from '../services/user-by-id.service';

export const mentorProfilResolver: ResolveFn<Mentor> = (route, state) => {
  return inject(MentorService).getMentorProfil();
};

export const mentorLanguagesResolver: ResolveFn<Observable<Language[]>> = (
  route,
  state
) => {
  return inject(UserService).getUserLanguages();
};

export const mentorSkillsResolver: ResolveFn<Skill[]> = (route, state) => {
  return inject(UserService).getUserSkills();
};

export const mentorExperiencesResolver: ResolveFn<Experience[]> = (
  route,
  state
) => {
  return inject(UserService).getUserExperiences();
};

export const mentorFormationsResolver: ResolveFn<Formation[]> = (
  route,
  state
) => {
  return inject(UserService).getUserFormations();
};

// with userId
export const mentorProfilByIdResolver: ResolveFn<Mentor> = (route, state) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getMentorProfilById(userId);
};

export const mentorLanguagesByIdResolver: ResolveFn<Observable<Language[]>> = (
  route,
  state
) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getUserLanguagesById(userId);
};

export const mentorSkillsByIdResolver: ResolveFn<Skill[]> = (route, state) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getUserSkillsById(userId);
};

export const mentorExperiencesByIdResolver: ResolveFn<Experience[]> = (
  route,
  state
) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getUserExperiencesById(userId);
};

export const mentorFormationsByIdResolver: ResolveFn<Formation[]> = (
  route,
  state
) => {
  const userId: number = +route.params['userId'];

  return inject(UserByIdService).getUserFormationsById(userId);
};
