import { Component, Input, OnInit } from '@angular/core';
import { Experience } from '../../../shared/models/experience';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-edit-experience',
  templateUrl: './form-edit-experience.component.html',
  styleUrl: './form-edit-experience.component.scss',
})
export class FormEditExperienceComponent implements OnInit {
  @Input() experience!: Experience;
  experienceForm!: FormGroup<any>;
  @Input() destroy!: () => void;

  onSubmit() {
    console.log(this.experienceForm.value);
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.experienceForm = this.fb.group({
      title: [this.experience.title],
      company: [this.experience.company],
      dateBegin: [this.experience.dateBegin],
      dateEnd: [this.experience.dateEnd],
    });
  }
  cancel() {
    console.log('cancel run');

    this.destroy();
  }
}
