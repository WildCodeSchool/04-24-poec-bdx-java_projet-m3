import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../user.service';
import { UserStoreService } from '../../../shared/services/stores/user-store.service';
import { User } from '../../../shared/models/user';
import { Experience } from '../../../shared/models/experience';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Formation } from '../../../shared/models/formation';

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

  @Output() destroy = new EventEmitter();
  @Output() onExperienceAdd = new EventEmitter<Formation>();

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
