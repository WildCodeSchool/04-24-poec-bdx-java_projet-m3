import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutMentor } from './pages/layout/layout-mentor-component';
import { ProfilMentorComponent } from './pages/profil-mentor/profil-mentor.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import {
  mentorReservationsHistoryResolver,
  mentorReservationsResolver,
} from '../../shared/resolvers/reservations.resolver';
import { MentorProfilByStudentComponent } from '../students/pages/mentor-profil-by-student/mentor-profil-by-student.component';
import { StudentProfilByMentorComponent } from './pages/student-profil-by-mentor/student-profil-by-mentor.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutMentor,
    // resolve: {
    // reservationsData: mentorReservationsResolver,
    // reservationsHistoryData: mentorReservationsHistoryResolver,
    // },
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
      {
      path: 'student-details/:userId',
      component: StudentProfilByMentorComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule],
})
export class MentorRoutingModule {}
