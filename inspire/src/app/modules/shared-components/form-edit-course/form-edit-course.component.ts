import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Formation } from '../../../shared/models/formation';

@Component({
  selector: 'app-form-edit-course',
  templateUrl: './form-edit-course.component.html',
  styleUrl: './form-edit-course.component.scss',
})
export class FormEditCourseComponent implements OnInit {
  @Input() formation!: Formation;
  courseForm!: FormGroup<any>;
  @Input() destroy!: () => void;

  onSubmit() {
    console.log(this.courseForm.value);
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      diplome: [this.formation.title],
      school: [this.formation.company],
      dateBegin: [this.formation.dateBegin],
      dateEnd: [this.formation.dateEnd],
      description: [''],
    });
  }
  cancel() {
    console.log('cancel run');

    this.destroy();
  }
}
