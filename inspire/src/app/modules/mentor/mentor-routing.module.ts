import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutMentor } from './pages/layout/layout-mentor-component';
import { ProfilMentorComponent } from './pages/profil-mentor/profil-mentor.component';
import { AgendaComponent } from './pages/agenda/agenda.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutMentor,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'profil',
        component: ProfilMentorComponent,
      },
      {
        path: 'agenda',
        component: AgendaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class MentorRoutingModule {}
