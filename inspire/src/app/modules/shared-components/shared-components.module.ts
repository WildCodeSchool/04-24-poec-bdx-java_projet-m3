import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialConnexionComponent } from './social-connexion/social-connexion.component';
import { FormExperienceComponent } from './form-experience/form-experience.component';
import { FormCourseComponent } from './form-course/form-course.component';
import { FormAboutComponent } from './form-about/form-about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChipComponent } from './chip/chip.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TreeTableModule } from 'primeng/treetable';
import { CardSkillComponent } from './card-skill/card-skill.component';
import { ListSkillsComponent } from './list-skills/list-skills.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [
    ButtonComponent,
    WelcomeComponent,
    SocialConnexionComponent,
    FormExperienceComponent,
    FormCourseComponent,
    FormAboutComponent,
    ChipComponent,
    CardSkillComponent,
    ListSkillsComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    TreeTableModule,
  ],
  exports: [
    ButtonComponent,
    WelcomeComponent,
    SocialConnexionComponent,
    FormExperienceComponent,
    FormCourseComponent,
    FormAboutComponent,
    ChipComponent,
    CardSkillComponent,
    ListSkillsComponent,
    ChipComponent,
    SideNavComponent
  ],
})
export class SharedComponentsModule {}
