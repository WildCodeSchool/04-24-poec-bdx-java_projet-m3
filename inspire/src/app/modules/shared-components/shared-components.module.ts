import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SocialConnexionComponent } from './social-connexion/social-connexion.component';
import { FormExperienceComponent } from './form-experience/form-experience.component';
import { FormAddCourseComponent } from './form-add-course/form-add-course.component';
import { FormAboutComponent } from './form-about/form-about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { FormEditCourseComponent } from './form-edit-course/form-edit-course.component';
import { ModalValidateComponent } from './modal-validate/modal-validate.component';
import { ModalEditLanguagesComponent } from './modal-edit-languages/modal-edit-languages.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormEditAproposComponent } from './form-edit-apropos/form-edit-apropos.component';
import { FormAddExperienceComponent } from './form-add-experience/form-add-experience.component';
import { FormEditExperienceComponent } from './form-edit-experience/form-edit-experience.component';
import { CardInfosComponent } from './ui/card-infos/card-infos.component';
import { FileUploadComponent } from './ui/file-upload/file-upload.component';
import { DashboardLinksComponent } from './dashboard-links/dashboard-links.component';
import { NavbarButtonComponent } from './ui/navbar-button/navbar-button.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    ButtonComponent,
    WelcomeComponent,
    SocialConnexionComponent,
    FormExperienceComponent,
    FormAddCourseComponent,
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
    FormEditCourseComponent,
    ModalValidateComponent,
    ModalEditLanguagesComponent,
    FormEditAproposComponent,
    FormAddExperienceComponent,
    FormEditExperienceComponent,
    CardInfosComponent,
    FileUploadComponent,
    DashboardLinksComponent,
    NavbarButtonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DividerModule,
    TreeTableModule,
    SidebarModule,
    DialogModule,
    MultiSelectModule,
    FormsModule,
    FileUploadModule,
    ToastModule,
    RouterLink,
  ],
  exports: [
    ButtonComponent,
    WelcomeComponent,
    SocialConnexionComponent,
    FormExperienceComponent,
    FormAddCourseComponent,
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
    ModalValidateComponent,
    FormEditAproposComponent,
    CardInfosComponent,
    FileUploadComponent,
    DashboardLinksComponent,
    NavbarButtonComponent,
  ],
  providers: [MessageService],
})
export class SharedComponentsModule {
  constructor(private messageService: MessageService) {}
}
