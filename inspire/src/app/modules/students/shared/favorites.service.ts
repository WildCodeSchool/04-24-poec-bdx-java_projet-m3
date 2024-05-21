import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) {}

  addToFavorites(studentId: number, mentorId: number): Observable<any> {
    console.log('Adding to favorites:', studentId, mentorId);
    return this.http.post(environment.BASE_URL + '/favorites/add', { studentId, mentorId });
  }

  removeFromFavorites(studentId: number, mentorId: number): Observable<any> {
    console.log('Removing from favorites:', studentId, mentorId);
    return this.http.delete(environment.BASE_URL + `/favorites/remove/${studentId}/${mentorId}`);
  }

  isFavorite(studentId: number, mentorId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.BASE_URL + `/favorites/${studentId}/${mentorId}`);
  }
}
