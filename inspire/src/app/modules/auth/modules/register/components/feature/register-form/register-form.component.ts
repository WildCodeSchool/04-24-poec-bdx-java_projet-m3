import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checkEqualityValidator } from '../../../validator-password/equality-passwords-validator';
import { passwordStrengthValidator } from '../../../validator-password/password-strength-validator';
import { UserService } from '../../../../../../../user.service';
import { User } from '../../../../../../../shared/models/user';

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

  private serviceUser = inject(UserService);

  onSubmit() {
    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: 'student',
    };
    this.serviceUser.createUser(user).subscribe();
  }

  constructor(private fb: FormBuilder) {}
}
