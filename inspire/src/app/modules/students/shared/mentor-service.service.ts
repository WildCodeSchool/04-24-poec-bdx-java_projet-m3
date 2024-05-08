import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentor } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MentorServiceService {

  private http = inject(HttpClient);


  constructor() { }

  getMentorsList$(): Observable<Mentor[]> {
    return this.http.get<any>(environment.BASE_URL + '/mentors');
  }
}
