import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';

const routes: Routes = [
  {path: "list-mentors", component: StudentLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
