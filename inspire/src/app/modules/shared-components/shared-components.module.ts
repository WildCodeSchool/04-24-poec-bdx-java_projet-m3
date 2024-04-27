import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialConnexionComponent } from './social-connexion/social-connexion.component';
import { FormExperienceComponent } from './form-experience/form-experience.component';
import { FormCourseComponent } from './form-course/form-course.component';

@NgModule({
  declarations: [
    ButtonComponent,
    WelcomeComponent,
    SocialConnexionComponent,
    FormExperienceComponent,
    FormCourseComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    WelcomeComponent,
    SocialConnexionComponent,
    FormExperienceComponent,
    FormCourseComponent,
  ],
})
export class SharedComponentsModule {}
