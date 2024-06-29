import { Inject, Injectable, inject } from '@angular/core';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../../../shared/models/chip';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}

  getSkillList(): Observable<any> {
    return this.http.get<Skill>(environment.BASE_URL_API + `/skill/get/all`);
  }
}
