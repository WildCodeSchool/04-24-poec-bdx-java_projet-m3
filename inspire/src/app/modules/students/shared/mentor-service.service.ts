import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorServiceService {

  private http = inject(HttpClient);

  constructor() { }

  getMentors(): Observable<any> {
    return this.http.get<any>("modules/students/mentors.json");
  }
}
