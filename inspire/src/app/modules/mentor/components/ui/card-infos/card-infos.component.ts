import { Component, Input } from '@angular/core';
import { Mentor, Student } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';

@Component({
  selector: 'app-card-infos',
  templateUrl: './card-infos.component.html',
  styleUrl: './card-infos.component.scss',
})
export class CardInfosComponent {
  @Input() mentor!: Mentor;
  @Input() chips!: Skill[];
  editFormApropoVisible = false;

  openEditFormApropos() {
    this.editFormApropoVisible = true;
  }
  closeEditFormApropos() {
    this.editFormApropoVisible = false;
  }

  updateProfil(newProfil: { profil: Mentor | Student; skills: Skill[] }) {
    console.log(newProfil);
  }
}
