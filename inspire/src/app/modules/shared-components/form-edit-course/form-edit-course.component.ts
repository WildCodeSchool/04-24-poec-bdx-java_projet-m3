import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Formation } from '../../../shared/models/formation';
import { UserService } from '../../../user.service';

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
    const formationId = this.formation.id;
    this.userService
      .editFormation(this.courseForm.value, formationId)
      .subscribe();
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    const date = new Date(this.formation.dateBegin);
    const formattedDate = date.toISOString().split('T')[0];
    const endDate = new Date(this.formation.dateEnd);
    const formattedEndDate = endDate.toISOString().split('T')[0];
    this.courseForm = this.fb.group({
      title: [this.formation.title],
      company: [this.formation.company],
      dateBegin: [formattedDate],
      dateEnd: [formattedEndDate],
    });
  }
  cancel() {
    console.log('cancel run');

    this.destroy();
  }
}
