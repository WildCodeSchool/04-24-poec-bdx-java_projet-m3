import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutMentor } from './pages/layout/layout-mentor-component';
import { ProfilMentorComponent } from './pages/profil-mentor/profil-mentor.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutMentor,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profil',
        component: ProfilMentorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class MentorRoutingModule {}