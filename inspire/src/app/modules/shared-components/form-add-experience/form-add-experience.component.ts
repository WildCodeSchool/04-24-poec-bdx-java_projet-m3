import {
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Experience } from '../../../shared/models/experience';

@Component({
  selector: 'app-form-add-experience',
  templateUrl: './form-add-experience.component.html',
  styleUrls: ['./form-add-experience.component.scss'],
})
export class FormAddExperienceComponent {
  experienceForm = this.fb.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    dateBegin: ['', Validators.required],
    dateEnd: ['', Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
  });

  @Output() destroy = new EventEmitter();
  @Output() onExperienceAdd = new EventEmitter<Experience>();

  destroyedRef = inject(DestroyRef);

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const experience: Experience = {
      title: this.experienceForm.value.title as string,
      company: this.experienceForm.value.company as string,
      dateBegin: this.experienceForm.value.dateBegin as string,
      dateEnd: this.experienceForm.value.dateEnd as string,
      city: this.experienceForm.value.city as string,
      country: this.experienceForm.value.country as string,
    } as Experience;

    this.onExperienceAdd.emit(experience);
  }

  cancel() {
    this.destroy.emit();
  }
}
