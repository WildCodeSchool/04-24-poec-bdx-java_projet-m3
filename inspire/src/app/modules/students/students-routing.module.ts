import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfilStudentComponent } from './pages/profil-student/profil-student.component';
import { ListFavoritesComponent } from './pages/list-favorites/list-favorites.component';
import { MentorProfilByStudentComponent } from './pages/mentor-profil-by-student/mentor-profil-by-student.component';
import { MentorService } from '../../shared/services/mentor.service';
import {
  mentorExperiencesByIdResolver,
  mentorFormationsByIdResolver,
  mentorLanguagesByIdResolver,
  mentorProfilByIdResolver,
  mentorSkillsByIdResolver,
} from '../../shared/resolvers/mentor.resolver';
import { StudentReservationComponent } from './pages/student-reservation/student-reservation.component';
import {
  studentReservationsHistoryResolver,
  studentReservationsResolver,
} from '../../shared/resolvers/reservations.resolver';
import { MentorReservationPageByStudentComponent } from './pages/mentor-reservation-page-by-student/mentor-reservation-page-by-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list-mentors', component: ListMentorsComponent },
      { path: '', component: ProfilStudentComponent },
      { path: 'list-favorites', component: ListFavoritesComponent },
      {
        path: 'mentor-details/:userId',
        component: MentorProfilByStudentComponent,
        resolve: {
          profil: mentorProfilByIdResolver,
          languages: mentorLanguagesByIdResolver,
          skills: mentorSkillsByIdResolver,
          formations: mentorFormationsByIdResolver,
          experiences: mentorExperiencesByIdResolver,
        },
      },
      {
        path: 'reservations',
        component: StudentReservationComponent,
        resolve: {
          reservationsData: studentReservationsResolver,
          reservationsHistoryData: studentReservationsHistoryResolver,
        },
      },
      {
        path: 'reserve/:userId',
        component: MentorReservationPageByStudentComponent,
        resolve: {
          profil: mentorProfilByIdResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
