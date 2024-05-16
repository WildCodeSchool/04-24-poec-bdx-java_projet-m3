import { Component, Input, OnInit } from '@angular/core';
import { Experience } from '../../../shared/models/experience';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../user.service';

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
    const experienceId = this.experience.id;
    this.userService
      .editExperience(this.experienceForm.value, experienceId)
      .subscribe();
  }

  constructor(private fb: FormBuilder, private userService: UserService) {}
  ngOnInit(): void {
    const date = new Date(this.experience.dateBegin);
    const formattedDate = date.toISOString().split('T')[0];
    const endDate = new Date(this.experience.dateEnd);
    const formattedEndDate = endDate.toISOString().split('T')[0];

    this.experienceForm = this.fb.group({
      title: [this.experience.title],
      company: [this.experience.company],
      dateBegin: [formattedDate],
      dateEnd: [formattedEndDate],
      city: [this.experience.city],
      country: [this.experience.country],
    });
  }
  cancel() {
    this.destroy();
  }
}
