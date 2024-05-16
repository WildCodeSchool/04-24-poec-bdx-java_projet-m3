import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { User } from '../../../shared/models/user';
import { Experience } from '../../../shared/models/experience';

@Component({
  selector: 'app-form-add-experience',
  templateUrl: './form-add-experience.component.html',
  styleUrls: ['./form-add-experience.component.scss'],
})
export class FormAddExperienceComponent {
  experienceForm = this.fb.group({
    title: [''],
    company: [''],
    dateBegin: [''],
    dateEnd: [''],
    city: [''],
    country: [''],
  });

  @Input() destroy!: () => void;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService
  ) {}

  onSubmit() {
    console.log(this.experienceForm.value);
    const user = this.userStore.getUserConnected$().value as User;

    const experience: Experience = {
      title: this.experienceForm.value.title as string,
      company: this.experienceForm.value.company as string,
      dateBegin: this.experienceForm.value.dateBegin as string,
      dateEnd: this.experienceForm.value.dateEnd as string,
      city: this.experienceForm.value.city as string,
      country: this.experienceForm.value.country as string,
      userId: user.id as number,
    };

    this.userService.postExperience(experience).subscribe();
  }

  cancel() {
    this.destroy();
  }
}
