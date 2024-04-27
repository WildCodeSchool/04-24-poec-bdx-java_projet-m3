import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styleUrl: './form-course.component.scss',
})
export class FormCourseComponent {
  courseForm = this.fb.group({
    diplome: [''],
    school: [''],
    dateBeggin: [''],
    dateEnd: [''],
    description: [''],
  });

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

  constructor(private fb: FormBuilder) {}
}
