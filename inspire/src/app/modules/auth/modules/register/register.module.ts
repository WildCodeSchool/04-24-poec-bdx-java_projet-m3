import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { RegisterFormComponent } from './components/feature/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterPageComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterModule {}
