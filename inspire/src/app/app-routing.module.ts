import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './modules/shared-components/side-nav/side-nav.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/modules/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/auth/modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  { path: 'layout', component: SideNavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
