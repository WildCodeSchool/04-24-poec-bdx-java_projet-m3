import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-about',
  templateUrl: './form-about.component.html',
  styleUrl: './form-about.component.scss',
})
export class FormAboutComponent {
  aboutForm = this.fb.group({
    description: [''],
  });

  onSubmit() {
    if (this.aboutForm.valid) {
      console.log(this.aboutForm.value);
    } else {
      console.log('Formulaire invalide');
    }
  }

  constructor(private fb: FormBuilder) {}
}
