import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MentorService } from '../services/mentor.service';
import { Language } from '../models/language';
import { Mentor } from '../models/user';
import { Skill } from '../models/chip';
import { Experience } from '../models/experience';
import { Formation } from '../models/formation';
import { Observable } from 'rxjs';

export const mentorProfilResolver: ResolveFn<Mentor> = (route, state) => {
  return inject(MentorService).getMentorProfil();
};

export const mentorLanguagesResolver: ResolveFn<Observable<Language[]>> = (
  route,
  state
) => {
  return inject(MentorService).getMentorLanguages();
};

export const mentorSkillsResolver: ResolveFn<Skill[]> = (route, state) => {
  return inject(MentorService).getMentorSkills();
};

export const mentorExperiencesResolver: ResolveFn<Experience[]> = (
  route,
  state
) => {
  return inject(MentorService).getMentorExperiences();
};

export const mentorFormationsResolver: ResolveFn<Formation[]> = (
  route,
  state
) => {
  return inject(MentorService).getMentorFormations();
};
