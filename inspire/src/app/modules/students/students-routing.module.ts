import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StudentLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list-mentors', component: ListMentorsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
