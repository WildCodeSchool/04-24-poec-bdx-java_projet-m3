import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfilStudentComponent } from './pages/profil-student/profil-student.component';
import { ListFavoritesComponent } from './pages/list-favorites/list-favorites.component';
import { StudentReservationComponent } from './pages/student-reservation/student-reservation.component';
import { studentReservationsHistoryResolver, studentReservationsResolver } from '../../shared/resolvers/reservations.resolver';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list-mentors', component: ListMentorsComponent },
      { path: '', component: ProfilStudentComponent },
      { path: 'list-favorites', component: ListFavoritesComponent },
      { path: 'reservations', component: StudentReservationComponent,
      resolve: {
        reservationsData: studentReservationsResolver,
        reservationsHistoryData: studentReservationsHistoryResolver
      }
       },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
