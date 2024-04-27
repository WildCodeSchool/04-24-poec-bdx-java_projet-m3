import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialConnexionComponent } from './social-connexion/social-connexion.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [ButtonComponent, WelcomeComponent, SocialConnexionComponent, SideNavComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, WelcomeComponent, SocialConnexionComponent],
})
export class SharedComponentsModule {}
