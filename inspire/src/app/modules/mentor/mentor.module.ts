import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { FormsModule } from '@angular/forms';
import { RowReservationComponent } from './components/ui/row-reservation/row-reservation-student.component';
import { DashboardLinksComponent } from './components/ui/dashboard-links/dashboard-links.component';
import { LayoutMentor } from './pages/layout/layout-mentor-component';
import { SharedModule } from 'primeng/api';
import { NavbarButtonComponent } from './components/ui/navbar-button/navbar-button.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardInfosComponent } from './components/ui/card-infos/card-infos.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { DividerModule } from 'primeng/divider';
import { ProfilMentorComponent } from './pages/profil-mentor/profil-mentor.component';
import { ListReservationComponent } from './components/features/list-reservation/list-reservation.component';
import { ListReservationHistoryComponent } from './components/features/list-reservation-history/list-reservation.component';
import { ReservationWithSwipeComponent } from './components/ui/reservation-with-swipe/reservation-with-swipe.component';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    LayoutMentor,
    RowReservationComponent,
    NavbarButtonComponent,
    DashboardLinksComponent,
    DashboardComponent,
    CardInfosComponent,
    ProfilMentorComponent,
    ListReservationComponent,
    ListReservationHistoryComponent,
    ReservationWithSwipeComponent,
    AgendaComponent,
  ],
  imports: [
    CommonModule,
    MentorRoutingModule,
    FormsModule,
    SharedModule,
    SharedComponentsModule,
    DividerModule,
    SidebarModule,
    DialogModule,
    FullCalendarModule,
  ],
  exports: [
    RowReservationComponent,
    DashboardLinksComponent,
    RowReservationComponent,
  ],
})
export class MentorModule {}
