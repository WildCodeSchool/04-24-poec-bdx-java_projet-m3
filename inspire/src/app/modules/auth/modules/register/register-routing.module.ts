import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleRegisterPageComponent } from './pages/role-register-page/role-register-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: RoleRegisterPageComponent },
  {
    path: 'student',
    component: RegisterPageComponent,
    data: { role: 'student' },
  },
  {
    path: 'mentor',
    component: RegisterPageComponent,
    data: { role: 'mentor' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
