import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationDTO } from '../../../shared/models/formation';
import { dateOrderValidator } from '../../../shared/validators/dateOrderValidator';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-form-edit-course',
  templateUrl: './form-edit-course.component.html',
  styleUrl: './form-edit-course.component.scss',
})
export class FormEditCourseComponent implements OnInit {
  @Input() formation!: FormationDTO;
  @Input() destroy!: () => void;
  @Output()
  formationEmitter = new EventEmitter<FormationDTO>();
  courseForm!: FormGroup<any>;

  onSubmit() {
    const id = this.formation.id;
    this.formationEmitter.emit({
      ...this.courseForm.value,
      id,
      userId: this.formation.userId,
    } as FormationDTO);
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    const date = new Date(this.formation.dateBegin);
    const formattedDate = date.toISOString().split('T')[0];
    const endDate = new Date(this.formation.dateEnd);
    const formattedEndDate = endDate.toISOString().split('T')[0];
    this.courseForm = this.fb.group(
      {
        title: [this.formation.title, Validators.required],
        company: [this.formation.company, Validators.required],
        dateBegin: [formattedDate, Validators.required],
        dateEnd: [formattedEndDate, Validators.required],
        city: [this.formation.city, Validators.required],
        country: [this.formation.country, Validators.required],
      },
      { validators: [dateOrderValidator('dateBegin', 'dateEnd')] }
    );
  }

  cancel() {
    this.destroy();
  }
}
