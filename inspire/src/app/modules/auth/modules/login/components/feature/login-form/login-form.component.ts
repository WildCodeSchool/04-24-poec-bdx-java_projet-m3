import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../../../../shared/services/user.service';
import { LoginService } from '../../../../../../../shared/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  modalVisible = false;
  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.loginService.login(email || '', password || '').subscribe();
  }
}
