import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMentor } from './modules/mentor/pages/layout/layout-mentor-component';
import { isConnected, isMentor, isStudent } from './shared/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/modules/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
    canActivate: [isConnected, isStudent],
  },
  {
    path: 'mentor',
    loadChildren: () =>
      import('./modules/mentor/mentor.module').then((m) => m.MentorModule),
    canActivate: [isConnected, isMentor],
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./modules/auth/modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  { path: 'layout', component: LayoutMentor },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
