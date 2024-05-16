import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-add-course',
  templateUrl: './form-add-course.component.html',
  styleUrl: './form-add-course.component.scss',
})
export class FormAddCourseComponent {
  courseForm = this.fb.group({
    diplome: [''],
    school: [''],
    dateBeggin: [''],
    dateEnd: [''],
    description: [''],
  });
  @Input() destroy!: () => void;

  onSubmit() {}

  constructor(private fb: FormBuilder) {}

  cancel() {
    this.destroy();
  }
}
