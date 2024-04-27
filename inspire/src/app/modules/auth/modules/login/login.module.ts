import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/feature/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
})
export class LoginModule {}
