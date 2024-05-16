import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import { Formation } from '../../../shared/models/formation';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-form-add-course',
  templateUrl: './form-add-course.component.html',
  styleUrl: './form-add-course.component.scss',
})
export class FormAddCourseComponent {
  courseForm = this.fb.group({
    city: [''],
    company: [''],
    country: [''],
    dateBegin: [''],
    dateEnd: [''],
    title: [''],
  });
  @Input() destroy!: () => void;

  onSubmit() {
    const user = this.userStore.getUserConnected$().value as User;

    const formation: Formation = {
      title: this.courseForm.value.title as string,
      company: this.courseForm.value.company as string,
      dateBegin: this.courseForm.value.dateBegin as string,
      dateEnd: this.courseForm.value.dateEnd as string,
      city: this.courseForm.value.city as string,
      country: this.courseForm.value.country as string,
      userId: user.id as number,
    };

    this.userService.postFormation(formation).subscribe();
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService
  ) {}

  cancel() {
    this.destroy();
  }
}
