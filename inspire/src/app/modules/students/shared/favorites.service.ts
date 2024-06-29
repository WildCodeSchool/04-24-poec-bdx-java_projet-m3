import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Favorite } from '../../../shared/models/favorite';
import { Mentor } from '../../../shared/models/user';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  userConnected = inject(UserStoreService).getUserConnected$();

  constructor(private http: HttpClient) {}

  addToFavorites(studentId: number, mentorId: number): Observable<any> {
    console.log(studentId);
    console.log(mentorId);
    return this.http.post(
      environment.BASE_URL_API +
        `/student/favorite/add/${studentId}/${mentorId}`,
      {}
    );
  }

  removeFromFavorites(studentId: number, mentorId: number): Observable<any> {
    return this.http.delete(
      environment.BASE_URL_API +
        `/student/favorite/delete/${studentId}/${mentorId}`
    );
  }

  isFavorite(
    studentId: number,
    mentorId: number
  ): Observable<{ isFavorite: boolean }> {
    return this.http.get<{ isFavorite: boolean }>(
      environment.BASE_URL_API + `/student/favorite/${studentId}/${mentorId}`
    );
  }

  getStudentFavorite(studentId: number): Observable<any> {
    return this.http.get<Favorite>(
      environment.BASE_URL_API + `/student/favorite/${studentId}`
    );
  }

  getListFavoriteMentor(studentId: number): Observable<any> {
    return this.http.get<Mentor>(
      environment.BASE_URL_API + `/favorite/mentors/${studentId}`
    );
  }
}
