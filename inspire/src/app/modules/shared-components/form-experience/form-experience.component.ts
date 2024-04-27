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
    society: [''],
    dateBeggin: [''],
    dateEnd: [''],
    description: [''],
  });

  onSubmit() {
    if (this.experienceForm.valid) {
      console.log(this.experienceForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

  constructor(private fb: FormBuilder) {}
}
