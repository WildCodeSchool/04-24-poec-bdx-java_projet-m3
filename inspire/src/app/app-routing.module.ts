import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMentor } from './modules/mentor/pages/layout/layout-mentor-component';
import {
  isConnected,
  isMentor,
  isNotLogged,
  isStudent,
} from './shared/guards/auth.guard';
import {
  mentorExperiencesResolver,
  mentorFormationsResolver,
  mentorLanguagesResolver,
  mentorProfilResolver,
  mentorSkillsResolver,
} from './shared/resolvers/mentor.resolver';
import {
  studentExperiencesResolver,
  studentFormationsResolver,
  studentProfilResolver,
  studentSkillsResolver,
} from './shared/resolvers/student.resolver';
import { ErrorPageComponent } from './modules/shared-components/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/modules/login/login.module').then(
        (m) => m.LoginModule
      ),
    canActivate: [isNotLogged],
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
    canActivate: [isConnected, isStudent],
    resolve: {
      profil: studentProfilResolver,
      languages: mentorLanguagesResolver,
      skills: studentSkillsResolver,
      formations: studentFormationsResolver,
      experiences: studentExperiencesResolver,
    },
  },
  {
    path: 'mentor',
    loadChildren: () =>
      import('./modules/mentor/mentor.module').then((m) => m.MentorModule),
    canActivate: [isConnected, isMentor],
    resolve: {
      languages: mentorLanguagesResolver,
      experiences: mentorExperiencesResolver,
      formations: mentorFormationsResolver,
      skills: mentorSkillsResolver,
      profil: mentorProfilResolver,
    },
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./modules/auth/modules/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  { path: 'layout', component: LayoutMentor },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: '/lol' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
