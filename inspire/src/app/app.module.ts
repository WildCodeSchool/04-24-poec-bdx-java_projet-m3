import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [AppComponent, ButtonComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule],
  providers: [provideAnimations()],
  bootstrap: [AppComponent],
})
export class AppModule {}
