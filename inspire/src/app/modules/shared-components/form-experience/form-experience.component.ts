import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-experience',
  templateUrl: './form-experience.component.html',
  styleUrl: './form-experience.component.scss',
})
export class FormExperienceComponent {
  experienceForm = this.fb.group({
    title: [''],
    company: [''],
    dateBeggin: [''],
    dateEnd: [''],
    description: [''],
  });

  onSubmit() {}

  constructor(private fb: FormBuilder) {}
}
