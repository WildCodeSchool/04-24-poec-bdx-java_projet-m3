import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';
import { CardMentorComponent } from './components/features/card-mentor/card-mentor.component';
import { ChipComponent } from '../shared-components/chip/chip.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { StudentLayoutComponent } from './pages/student-layout/student-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FilterSearchListComponent } from './components/features/filter-search-list/filter-search-list.component';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { DashboardLinkStudentComponent } from './components/ui/dashboard-link-student/dashboard-link-student.component';
import { MentorModule } from '../mentor/mentor.module';
import { ListFavoritesComponent } from './pages/list-favorites/list-favorites.component';


@NgModule({
  declarations: [
    ListMentorsComponent,
    CardMentorComponent,
    StudentLayoutComponent,
    DashboardComponent,
    FilterSearchListComponent,
    DashboardLinkStudentComponent,
    ListFavoritesComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedComponentsModule,
    HttpClientModule,
    FormsModule,
    MultiSelectModule,
    ListboxModule,
    MentorModule
  ]
})
export class StudentsModule { }
