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
import { ListChipComponent } from './list-chip/list-chip.component';
import { CardFormationComponent } from './ui/card-formation/card-formation.component';
import { ListFormationComponent } from './ui/list-formation/list-formation.component';
import { CardExperienceComponent } from './ui/card-experience/card-experience.component';
import { ListExperienceComponent } from './ui/list-experience/list-experience.component';
import { ListLanguageComponent } from './ui/list-language/list-language.component';

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
    ListChipComponent,
    CardFormationComponent,
    ListFormationComponent,
    CardExperienceComponent,
    ListExperienceComponent,
    ListLanguageComponent,
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
    ListChipComponent,
    CardFormationComponent,
    ListFormationComponent,
    CardExperienceComponent,
    ListExperienceComponent,
    ListLanguageComponent,
  ],
})
export class SharedComponentsModule {}
