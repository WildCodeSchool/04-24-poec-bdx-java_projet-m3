import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    console.log(this.loginForm.value);
  }
  constructor(private fb: FormBuilder) {}
}
