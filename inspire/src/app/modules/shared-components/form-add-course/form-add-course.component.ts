import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Formation, FormationDTO } from '../../../shared/models/formation';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { User } from '../../../shared/models/user';
import { dateOrderValidator } from '../../../shared/validators/dateOrderValidator';

@Component({
  selector: 'app-form-add-course',
  templateUrl: './form-add-course.component.html',
  styleUrl: './form-add-course.component.scss',
})
export class FormAddCourseComponent {
  courseForm = this.fb.group(
    {
      city: ['', Validators.required],
      company: ['', Validators.required],
      country: ['', Validators.required],
      dateBegin: ['', Validators.required],
      dateEnd: ['', Validators.required],
      title: ['', Validators.required],
    },
    { validators: [dateOrderValidator('dateBegin', 'dateEnd')] }
  );
  @Output() destroy = new EventEmitter();
  @Output() formationEmitter = new EventEmitter<FormationDTO>();

  onSubmit() {
    const user = this.userStore.getUserConnected$().value;
    const formation: FormationDTO = {
      title: this.courseForm.value.title as string,
      company: this.courseForm.value.company as string,
      dateBegin: this.courseForm.value.dateBegin as string,
      dateEnd: this.courseForm.value.dateEnd as string,
      city: this.courseForm.value.city as string,
      country: this.courseForm.value.country as string,
      userId: user.id as number,
    };
    this.formationEmitter.emit(formation);
    this.destroy.emit();
  }

  constructor(private fb: FormBuilder, private userStore: UserStoreService) {}

  cancel() {
    this.destroy.emit();
  }
}
