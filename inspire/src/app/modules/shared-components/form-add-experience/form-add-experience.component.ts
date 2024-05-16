import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-add-experience',
  templateUrl: './form-add-experience.component.html',
  styleUrl: './form-add-experience.component.scss',
})
export class FormAddExperienceComponent {
  experienceForm = this.fb.group({
    title: [''],
    company: [''],
    dateBeggin: [''],
    dateEnd: [''],
  });
  @Input() destroy!: () => void;

  onSubmit() {}

  constructor(private fb: FormBuilder) {}

  cancel() {
    this.destroy();
  }
}
