import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checkEqualityValidator } from '../../../validator-password/equality-passwords-validator';
import { passwordStrengthValidator } from '../../../validator-password/password-strength-validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  registerForm = this.fb.group(
    {
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
      checkPassword: ['', [Validators.required]],
      checkboxCgv: [false, [Validators.requiredTrue]],
    },
    {
      validator: checkEqualityValidator('password', 'checkPassword'),
    }
  );

  onSubmit() {
    console.log(this.registerForm);
  }

  constructor(private fb: FormBuilder) {}
}
