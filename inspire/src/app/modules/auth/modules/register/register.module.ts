import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { RegisterFormComponent } from './components/feature/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleRegisterPageComponent } from './pages/role-register-page/role-register-page.component';
import { CardRoleComponent } from './components/feature/card-role/card-role.component';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';

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
    FormsModule,
    SidebarModule,
    DialogModule,
  ],
})
export class RegisterModule {}
