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

  onSubmit() {}

  constructor(private fb: FormBuilder) {}
}
