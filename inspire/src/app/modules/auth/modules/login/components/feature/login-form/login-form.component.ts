import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../../../../user.service';
import { User } from '../../../../../../../shared/models/user';

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
  constructor(private fb: FormBuilder, private userService: UserService) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.userService.login(email, password).subscribe();
  }
}
