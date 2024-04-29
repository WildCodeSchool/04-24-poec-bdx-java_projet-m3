import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { ListMentorsComponent } from './pages/list-mentors/list-mentors.component';
import { CardMentorComponent } from './components/features/card-mentor/card-mentor.component';
import { ChipComponent } from '../shared-components/chip/chip.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    ListMentorsComponent,
    CardMentorComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedComponentsModule,
  ]
})
export class StudentsModule { }
