import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checkEqualityValidator } from '../../../validator-password/equality-passwords-validator';
import { strongPasswordValidator } from '../../../validator-password/password-strength-validator';
import { UserService } from '../../../../../../../user.service';
import { ActivatedRoute } from '@angular/router';
import { emailSchoolValidator } from '../../../validator-email/school-email-validator';
import { environment } from '../../../../../../../../environments/environment.development';

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
          emailSchoolValidator(environment.EXTENSION_EMAIL),
        ],
      ],
      password: ['', [Validators.required, strongPasswordValidator()]],
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
    if (this.role === 'student') {
      this.userService.createStudent(this.registerForm.value).subscribe();
    } else if (this.role === 'mentor') {
      this.userService.createMentor(this.registerForm.value).subscribe();
    }
  }
}
