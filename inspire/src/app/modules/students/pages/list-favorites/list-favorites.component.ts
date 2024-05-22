import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mentor } from '../../../../shared/models/user';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrl: './list-favorites.component.scss'
})
export class ListFavoritesComponent {

  private mentorListSubject = new BehaviorSubject<Mentor[]>([]);

  constructor(private _mentorService: MentorService) {}

  mentorList$: Observable<Mentor[]> = this.mentorListSubject.asObservable();

}
