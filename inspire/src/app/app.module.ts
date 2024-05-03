import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StorageModule } from '@ngx-pwa/local-storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MentorModule } from './modules/mentor/mentor.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    MentorModule,
    StorageModule,
  ],
  providers: [provideAnimations(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
