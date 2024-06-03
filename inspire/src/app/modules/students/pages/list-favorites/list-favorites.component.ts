import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mentor, MentorDTO } from '../../../../shared/models/user';
import { MentorService } from '../../../../shared/services/mentor.service';
import { UserStoreService } from '../../../../shared/services/stores/user-store.service';
import { FavoritesService } from '../../shared/favorites.service';
import { StudentService } from '../../../../shared/services/student.service';

@Component({
  selector: 'app-list-favorites',
  templateUrl: './list-favorites.component.html',
  styleUrl: './list-favorites.component.scss',
})
export class ListFavoritesComponent {
  private mentorListSubject = new BehaviorSubject<MentorDTO[]>([]);

  constructor(
    private _mentorService: MentorService,
    private studentService: StudentService
  ) {}

  mentorList$: Observable<MentorDTO[]> = this.mentorListSubject.asObservable();

  ngOnInit(): void {
    this.getListFavoriteMentor();
  }

  getListFavoriteMentor(): void {
    this._mentorService
      .getMentorListFavoriteByStudent(
        this.studentService.activeStudentProfil$.value.id || 0
      )
      .subscribe((mentors) => {
        this.mentorListSubject.next(mentors);
      });
  }
}
