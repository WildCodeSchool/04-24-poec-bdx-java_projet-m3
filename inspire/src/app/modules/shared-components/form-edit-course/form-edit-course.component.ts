import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormationDTO } from '../../../shared/models/formation';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-form-edit-course',
  templateUrl: './form-edit-course.component.html',
  styleUrl: './form-edit-course.component.scss',
})
export class FormEditCourseComponent implements OnInit {
  @Input() formation!: FormationDTO;
  @Input() destroy!: () => void;
  @Output()
  formationEmitter = new EventEmitter<FormationDTO>();
  courseForm!: FormGroup<any>;

  onSubmit() {
    const id = this.formation.id;
    this.formationEmitter.emit({
      ...this.courseForm.value,
      id,
      userId: this.formation.userId,
    } as FormationDTO);
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
      city: [this.formation.city],
      country: [this.formation.country],
    });
  }
  cancel() {
    this.destroy();
  }
}
