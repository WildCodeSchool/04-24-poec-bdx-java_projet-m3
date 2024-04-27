import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { RegisterFormComponent } from './components/feature/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleRegisterPageComponent } from './pages/role-register-page/role-register-page.component';
import { CardRoleComponent } from './components/feature/card-role/card-role.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    RegisterPageComponent,
    RegisterFormComponent,
    RoleRegisterPageComponent,
    CardRoleComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    SidebarModule,
  ],
})
export class RegisterModule {}
