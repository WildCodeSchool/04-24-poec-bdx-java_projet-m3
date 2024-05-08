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
      id: '6a04',
      name: 'javascript',
    },
    {
      id: '8376',
      name: 'C plus plus',
    },
    {
      id: 'f7f7',
      name: 'C Sharp',
    },
    {
      id: 'bcae',
      name: 'java',
    },
    {
      id: 'b6f5',
      name: 'html',
    },
    {
      id: 'd45d',
      name: 'css',
    },
    {
      id: '11b0',
      name: 'angular',
    },
    {
      id: '7f92',
      name: 'react',
    },
    {
      id: '1bd3',
      name: 'spring',
    },
    {
      id: '001e',
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
