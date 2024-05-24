import { Injectable, inject } from '@angular/core';
import { Experience } from '../models/experience';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Language } from '../models/language';
import { Formation } from '../models/formation';
import { Skill } from '../models/chip';
import { Mentor } from '../models/user';
import { MentorService } from './mentor.service';

@Injectable({
  providedIn: 'root',
})
export class UserByIdService {
  mentorService = inject(MentorService);
  http = inject(HttpClient);

  getMentorProfilById(userId: number) {
    return this.http.get<Mentor>(
      environment.BASE_URL + '/mentor/mentors/' + userId
    );
  }

  getUserExperiencesById(userId: number) {
    return this.http.get<Experience[]>(
      environment.BASE_URL + '/experience/experiences/user/' + userId
    );
  }

  getUserLanguagesById(userId: number) {
    return this.http.get<Language[]>(
      environment.BASE_URL + '/language/languages/user/' + userId
    );
  }

  getUserFormationsById(userId: number) {
    return this.http.get<Formation[]>(
      environment.BASE_URL + '/formation/formations/user/' + userId
    );
  }

  getUserSkillsById(userId: number) {
    return this.http.get<Skill[]>(
      environment.BASE_URL + '/skill/skills/user/' + userId
    );
  }
}
