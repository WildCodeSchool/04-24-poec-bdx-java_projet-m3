import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { checkEqualityValidator } from '../../../validator-password/equality-passwords-validator';
import { strongPasswordValidator } from '../../../validator-password/password-strength-validator';
import { ActivatedRoute } from '@angular/router';
import { emailSchoolValidator } from '../../../validator-email/school-email-validator';
import { environment } from '../../../../../../../../environments/environment.development';
import { UserService } from '../../../../../../../shared/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm = this.fb.group(
    {
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
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
      console.log(this.role);
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
