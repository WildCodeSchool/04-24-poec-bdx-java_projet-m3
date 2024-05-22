import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mentor } from '../../../../shared/models/user';
import { MentorService } from '../../../../shared/services/mentor.service';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { FavoritesService } from '../../shared/favorites.service';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrl: './list-favorites.component.scss'
})
export class ListFavoritesComponent {

  private mentorListSubject = new BehaviorSubject<Mentor[]>([]);

  constructor(
    private _mentorService: MentorService,
    private userStoreService: UserStoreService,
  ) {}

  mentorList$: Observable<Mentor[]> = this.mentorListSubject.asObservable();

  ngOnInit(): void {
    this.getListFavoriteMentor();
    console.log("list:", this.getListFavoriteMentor())
  }

  getListFavoriteMentor(): void {
    this._mentorService.getMentorListFavoriteByStudent(2).subscribe((mentors) => {
      this.mentorListSubject.next(mentors);
    });
  }
}
