import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { FormsModule } from '@angular/forms';
import { RowReservationComponent } from './components/ui/row-reservation/row-reservation-student.component';
import { DashboardLinksComponent } from './components/ui/dashboard-links/dashboard-links.component';
import { LayoutMentor } from './pages/layout/layout-mentor-component';
import { SharedModule } from 'primeng/api';
import { NavbarButtonComponent } from './components/ui/navbar-button/navbar-button.component';
import { ListGenericComponent } from './components/features/list-generic/list-generic.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardInfosComponent } from './components/ui/card-infos/card-infos.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    LayoutMentor,
    RowReservationComponent,
    NavbarButtonComponent,
    ListGenericComponent,
    DashboardLinksComponent,
    DashboardComponent,
    CardInfosComponent,
  ],
  imports: [
    CommonModule,
    MentorRoutingModule,
    FormsModule,
    SharedModule,
    SharedComponentsModule,
  ],
  exports: [
    RowReservationComponent,
    DashboardLinksComponent,
    RowReservationComponent,
  ],
})
export class MentorModule {}
