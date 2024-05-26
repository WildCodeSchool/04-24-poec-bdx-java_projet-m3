import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mentor, MentorDTO } from '../../../../shared/models/user';
import { MentorService } from '../../../../shared/services/mentor.service';

@Component({
  selector: 'app-list-mentors',
  templateUrl: './list-mentors.component.html',
  styleUrl: './list-mentors.component.scss',
})
export class ListMentorsComponent implements OnInit {
  private mentorListSubject = new BehaviorSubject<MentorDTO[]>([]);

  constructor(private _mentorService: MentorService) {}

  mentorList$: Observable<MentorDTO[]> = this.mentorListSubject.asObservable();

  ngOnInit(): void {
    this.getMentorsList();
  }

  getMentorsList(): void {
    this._mentorService.getMentorsList().subscribe((mentors) => {
      this.mentorListSubject.next(mentors);
    });
  }

  updateMentorList(filteredMentors: MentorDTO[]) {
    this.mentorListSubject.next(filteredMentors);
  }
}
