import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MentorModule } from './modules/mentor/mentor.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';

import '@angular/common/locales/global/fr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    MentorModule,
    FullCalendarModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
