import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MentorModule } from './modules/mentor/mentor.module';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';

import '@angular/common/locales/global/fr';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { ToastModule } from 'primeng/toast';
import { errorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';

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
    ToastModule,
    ProgressBarModule,
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(
      withInterceptors([tokenInterceptor, errorHandlerInterceptor])
    ),
    { provide: LOCALE_ID, useValue: 'fr' },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
