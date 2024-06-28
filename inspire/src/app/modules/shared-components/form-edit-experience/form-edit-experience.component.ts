import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Experience, ExperienceDTO } from '../../../shared/models/experience';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { dateOrderValidator } from '../../../shared/validators/dateOrderValidator';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-form-edit-experience',
  templateUrl: './form-edit-experience.component.html',
  styleUrl: './form-edit-experience.component.scss',
})
export class FormEditExperienceComponent implements OnInit {
  @Input() experience!: ExperienceDTO;
  @Output() destroy = new EventEmitter();
  @Output() experienceEmitter = new EventEmitter<ExperienceDTO>();
  experienceForm!: FormGroup<any>;

  destroyRef = inject(DestroyRef);

  onSubmit() {
    const id = this.experience.id;
    this.experienceEmitter.emit({ ...this.experienceForm.value, id });
    this.destroy.emit();
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    const date = new Date(this.experience.dateBegin);
    const formattedDate = date.toISOString().split('T')[0];
    const endDate = new Date(this.experience.dateEnd);
    const formattedEndDate = endDate.toISOString().split('T')[0];

    this.experienceForm = this.fb.group(
      {
        title: [this.experience.title, Validators.required],
        company: [this.experience.company, Validators.required],
        dateBegin: [formattedDate, Validators.required],
        dateEnd: [formattedEndDate, Validators.required],
        city: [this.experience.city, Validators.required],
        country: [this.experience.country, Validators.required],
      },
      { validators: [dateOrderValidator('dateBegin', 'dateEnd')] }
    );
  }
  cancel() {
    this.destroy.emit();
  }
}
