import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { Mentor, MentorFullProfil } from '../models/user';
import { UserStoreService } from './stores/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  httpClient = inject(HttpClient);
  userConnected = inject(UserStoreService).getUserConnected$();

  constructor() {}

  activeMentorProfil$: BehaviorSubject<Mentor> = new BehaviorSubject(
    {} as Mentor
  );

  getMentorProfil() {
    return this.httpClient.get<Mentor>(
      environment.BASE_URL + '/mentor/mentors/' + this.userConnected.value?.id
    );
  }
}
