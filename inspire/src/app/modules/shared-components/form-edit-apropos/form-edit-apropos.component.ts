import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-edit-apropos',
  templateUrl: './form-edit-apropos.component.html',
  styleUrl: './form-edit-apropos.component.scss',
})
export class FormEditAproposComponent implements OnInit {
  aproposForm!: FormGroup<any>;
  @Input() destroy!: () => void;

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
    });
  }
  cancel() {
    console.log('cancel run');

    this.destroy();
  }
}
