import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mentor } from '../../../shared/models/user';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) {}

  addToFavorites(mentorId: number): Observable<any> {
    console.log('Adding to favorites:', mentorId);
    return this.http.post(environment.BASE_URL + '/favorites/add', { mentorId });
  }

  removeFromFavorites(mentorId: number): Observable<any> {
    console.log('Removing from favorites:', mentorId);
    return this.http.delete(environment.BASE_URL + `/favorites/remove/${mentorId}`);
  }
}
