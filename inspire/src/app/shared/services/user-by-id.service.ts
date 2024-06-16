import { Injectable, inject } from '@angular/core';
import { Experience } from '../models/experience';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Language } from '../models/language';
import { Formation } from '../models/formation';
import { Skill } from '../models/chip';
import { Mentor, Student } from '../models/user';
import { MentorService } from './mentor.service';

@Injectable({
  providedIn: 'root',
})
export class UserByIdService {
  mentorService = inject(MentorService);
  http = inject(HttpClient);

  getMentorProfilById(userId: number) {
    return this.http.get<Mentor>(environment.BASE_URL_API + 'mentor/' + userId);
  }

  getStudentProfilById(userId: number) {
    return this.http.get<Student>(
      environment.BASE_URL + '/student/students/' + userId
    );
  }

  getUserExperiencesById(userId: number) {
    return this.http.get<Experience[]>(
      environment.BASE_URL_API + 'experience/user/' + userId
      //'http://localhost:8080/experience/user/1'
    );
  }

  getUserLanguagesById(userId: number) {
    return this.http.get<Language[]>(
      'http://localhost:8080/language/user/' + userId
      // environment.BASE_URL + '/language/languages/user/' + userId
    );
  }

  getUserFormationsById(userId: number) {
    return this.http.get<Formation[]>(
      'http://localhost:8080/formation/user/' + userId
      // environment.BASE_URL + '/formation/formations/user/' + userId
    );
  }

  getUserSkillsById(userId: number) {
    return this.http.get<Skill[]>(
      environment.BASE_URL_API + 'skill/user/' + userId
    );
  }
}
