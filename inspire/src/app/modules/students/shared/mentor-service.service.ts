import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Mentor } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment.development';
import { Skill } from '../../../shared/models/chip';

@Injectable({
  providedIn: 'root',
})
export class MentorServiceService {
  private http = inject(HttpClient);

  private mentorList: Mentor[] = [];

  constructor() {}

  getMentorsList$(): Observable<Mentor[]> {
    return this.http
      .get<any>(environment.BASE_URL + '/mentor/mentors')
      .pipe(tap((res) => console.log(res)));
  }

  getMentorsBySkills(selectedSkills: Skill[]): Observable<Mentor[]> {
  
    const skillNames = selectedSkills.map(skill => skill.name);

    console.log(skillNames)

    const params = new HttpParams().set('skills', skillNames.join(','));

    return this.http.get<Mentor[]>(environment.BASE_URL + '/mentor/mentors', { params });
  }

  updateMentorList(mentors: Mentor[]): void {
    this.mentorList = mentors;
  }

  // Méthode pour récupérer la liste des mentors mise à jour
  getUpdatedMentorList(): Mentor[] {
    return this.mentorList;
  }
}
