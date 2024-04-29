import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';

const routes: Routes = [
  {path: "list-mentors", component: ListMentorsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
