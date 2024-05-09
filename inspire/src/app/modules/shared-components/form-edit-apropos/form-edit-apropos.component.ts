import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Skill } from '../../../shared/models/chip';

@Component({
  selector: 'app-form-edit-apropos',
  templateUrl: './form-edit-apropos.component.html',
  styleUrl: './form-edit-apropos.component.scss',
})
export class FormEditAproposComponent implements OnInit {
  aproposForm!: FormGroup<any>;
  @Output() destroy = new EventEmitter();
  @Input() skills: Skill[] = [
    {
      id: 1,
      name: 'javascript',
    },
    {
      id: 2,
      name: 'C plus plus',
    },
    {
      id: 3,
      name: 'C Sharp',
    },
    {
      id: 4,
      name: 'java',
    },
    {
      id: 5,
      name: 'html',
    },
    {
      id: 6,
      name: 'css',
    },
    {
      id: 7,
      name: 'angular',
    },
    {
      id: 8,
      name: 'react',
    },
    {
      id: 9,
      name: 'spring',
    },
    {
      id: 10,
      name: 'node',
    },
  ];
  @Input() selectedSkills!: Skill[];

  onSubmit() {
    console.log(this.aproposForm.value);
  }

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.aproposForm = this.fb.group({
      title: [''],
      imgUrl: [''],
      linkedinUrl: [''],
      githubUrl: [''],
      description: [''],
      selectedSkills: new FormControl<Skill[] | null>(this.selectedSkills),
    });
  }
  cancel() {
    console.log('cancel run');

    this.destroy.emit();
  }

  submit() {
    console.log('submit run');
    this.destroy.emit();
  }
}
