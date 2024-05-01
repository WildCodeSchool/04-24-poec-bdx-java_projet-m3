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
import { CardSkillComponent } from './components/ui/card-skill-mentor/card-skill-mentor.component';
import { ListSkillsMentorComponent } from './components/ui/list-skills-mentor/list-skills-mentor.component';
import { DividerModule } from 'primeng/divider';
import { ProfilMentorComponent } from './pages/profil-mentor/profil-mentor.component';
import { ListLanguagesComponent } from './components/ui/list-languages/list-languages.component';
import { CardFormationComponent } from './components/ui/card-formation/card-formation.component';
import { ListFormationsComponent } from './components/ui/list-formations/list-formations.component';
import { ListReservationComponent } from './components/features/list-reservation/list-reservation.component';
import { ListReservationHistoryComponent } from './components/features/list-reservation-history/list-reservation.component';

@NgModule({
  declarations: [
    LayoutMentor,
    RowReservationComponent,
    NavbarButtonComponent,
    DashboardLinksComponent,
    DashboardComponent,
    CardInfosComponent,
    CardSkillComponent,
    ListSkillsMentorComponent,
    ProfilMentorComponent,
    ListLanguagesComponent,
    CardFormationComponent,
    ListFormationsComponent,
    ListReservationComponent,
    ListReservationHistoryComponent,
  ],
  imports: [
    CommonModule,
    MentorRoutingModule,
    FormsModule,
    SharedModule,
    SharedComponentsModule,
    DividerModule,
  ],
  exports: [
    RowReservationComponent,
    DashboardLinksComponent,
    RowReservationComponent,
  ],
})
export class MentorModule {}
