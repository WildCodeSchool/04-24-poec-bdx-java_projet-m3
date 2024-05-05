import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RoleRegisterPageComponent } from './pages/role-register-page/role-register-page.component';

const routes: Routes = [
  {
    path: '',
    component: RoleRegisterPageComponent,
  },
  {
    path: 'student',
    component: RegisterPageComponent,
  },
  {
    path: 'mentor',
    component: RegisterPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
