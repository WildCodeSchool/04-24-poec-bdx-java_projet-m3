import { Component } from '@angular/core';
import { MentorServiceService } from '../../shared/mentor-service.service';
import { Observable } from 'rxjs';
import { Mentor } from '../../../../shared/models/user';

@Component({
  selector: 'app-list-mentors',
  templateUrl: './list-mentors.component.html',
  styleUrl: './list-mentors.component.scss'
})
export class ListMentorsComponent {

  mentorList$: Observable<Mentor[]> = this._mentorService.getMentorsList$();


  constructor(private _mentorService: MentorServiceService) { }

}
