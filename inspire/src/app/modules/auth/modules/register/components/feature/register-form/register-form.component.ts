import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checkEqualityValidator } from '../../../validator-password/equality-passwords-validator';
import { passwordStrengthValidator } from '../../../validator-password/password-strength-validator';
import { UserService } from '../../../../../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { emailSchoolValidator } from '../../../validator-email/school-email-validator';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = this.fb.group(
    {
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          emailSchoolValidator(`wilder.fr`),
        ],
      ],
      password: ['', [Validators.required, passwordStrengthValidator]],
      checkPassword: ['', [Validators.required]],
      checkboxCgv: [false, [Validators.requiredTrue]],
    },
    {
      validator: checkEqualityValidator('password', 'checkPassword'),
    }
  );

  role!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.role = data['role'];
    });
  }

  onSubmit() {
    console.log(this.registerForm);
    if (this.role === 'student') {
      this.userService.createStudent(this.registerForm.value).subscribe();
    } else if (this.role === 'mentor') {
      this.userService.createMentor(this.registerForm.value).subscribe();
    }
  }
}
