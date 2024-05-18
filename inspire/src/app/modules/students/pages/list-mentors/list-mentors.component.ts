import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mentor } from '../../../../shared/models/user';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-list-mentors',
  templateUrl: './list-mentors.component.html',
  styleUrl: './list-mentors.component.scss',
})
export class ListMentorsComponent implements OnInit {
  private mentorListSubject = new BehaviorSubject<Mentor[]>([]);

  constructor(private _mentorService: MentorService) {}

  mentorList$: Observable<Mentor[]> = this.mentorListSubject.asObservable();

  ngOnInit(): void {
    this.getMentorsList();
  }

  getMentorsList(): void {
    this._mentorService.getMentorsList().subscribe((mentors) => {
      this.mentorListSubject.next(mentors);
    });
  }

  updateMentorList(filteredMentors: Mentor[]) {
    this.mentorListSubject.next(filteredMentors);
  }
}
