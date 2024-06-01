import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EditorModule } from 'primeng/editor';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedComponentsModule,
    FormsModule,
    SharedModule,
    DividerModule,
    SidebarModule,
    DialogModule,
    FullCalendarModule,
    EditorModule,
    ReactiveFormsModule,
    PaginatorModule,
  ],
})
export class AdminModule {}
