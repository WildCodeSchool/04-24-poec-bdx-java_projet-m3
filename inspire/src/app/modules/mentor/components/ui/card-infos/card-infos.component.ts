import { Component, Input, inject } from '@angular/core';
import { Mentor } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { MentorService } from '../../../../../shared/services/mentor.service';

@Component({
  selector: 'app-card-infos',
  templateUrl: './card-infos.component.html',
  styleUrl: './card-infos.component.scss',
})
export class CardInfosComponent {
  @Input() mentor!: Mentor;
  @Input() chips!: Skill[];
  editFormApropoVisible = false;

  mentorService = inject(MentorService);

  openEditFormApropos() {
    this.editFormApropoVisible = true;
    console.log('clicked edit');
  }
  closeEditFormApropos() {
    this.editFormApropoVisible = false;
  }

  updateProfil(event: any) {
    console.log('received : ', event);
    this.mentorService
      .updateMentorProfil(event)
      .subscribe((ele) => console.log('lol', ele));
  }
}
