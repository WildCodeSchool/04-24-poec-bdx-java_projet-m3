import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../../../../user.service';
import { emailPasswordValidator } from '../../../validator-connexion/validator-connexion';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    },
    { validators: emailPasswordValidator('email', 'password') }
  );

  modalVisible = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email || '', password || '').subscribe();
    } else {
      console.log('Form is invalid', this.loginForm.errors);
    }
  }
}
