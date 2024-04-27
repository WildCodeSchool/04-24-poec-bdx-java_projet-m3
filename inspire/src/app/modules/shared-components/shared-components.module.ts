import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialConnexionComponent } from './social-connexion/social-connexion.component';

@NgModule({
  declarations: [ButtonComponent, WelcomeComponent, SocialConnexionComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, WelcomeComponent, SocialConnexionComponent],
})
export class SharedComponentsModule {}
