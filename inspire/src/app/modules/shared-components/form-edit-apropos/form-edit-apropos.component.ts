import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Skill } from '../../../shared/models/chip';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Mentor,
  MentorDTO,
  Student,
  StudentDTO,
} from '../../../shared/models/user';

@Component({
  selector: 'app-form-edit-apropos',
  templateUrl: './form-edit-apropos.component.html',
  styleUrl: './form-edit-apropos.component.scss',
})
export class FormEditAproposComponent implements OnInit, OnDestroy {
  aproposForm!: FormGroup<any>;
  @Output() destroy = new EventEmitter();
  @Output() profilEmitter = new EventEmitter<{
    profil: MentorDTO | StudentDTO;
    skills: Skill[];
    file?: File;
    fileName?: string;
  }>();
  file!: File;
  fileName!: string;
  @Input() selectedSkills!: Skill[];
  @Input() profil!: MentorDTO;
  skills!: Skill[];

  destroyRef = inject(DestroyRef);
  listSkills$ = inject(UserService).getListSkills();

  onSubmit() {
    this.profilEmitter.emit({
      profil: {
        id: this.profil.id,
        title: this.aproposForm.value['title'],
        firstname: this.aproposForm.value['firstname'],
        lastname: this.aproposForm.value['lastname'],
        description: this.aproposForm.value['description'],
        imgUrl: this.aproposForm.value['imgUrl'],
        linkedinUrl: this.aproposForm.value['linkedinUrl'],
        githubUrl: this.aproposForm.value['githubUrl'],
      } as MentorDTO,
      skills: this.selectedSkills,
      file: this.file,
      fileName: this.fileName,
    });
    this.destroy.emit();
  }

  listSkillsSubscriptionRef!: Subscription;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.aproposForm = this.fb.group({
      title: [this.profil.title],
      imgUrl: [this.profil.imgUrl],
      linkedinUrl: [this.profil.linkedinUrl],
      githubUrl: [this.profil.githubUrl],
      firstname: [this.profil.firstname],
      lastname: [this.profil.lastname],
      description: [this.profil.description],
      selectedSkill: [this.selectedSkills],
    });

    this.listSkillsSubscriptionRef = this.listSkills$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.skills = res));
  }

  setSkills(val: Skill[]) {
    this.selectedSkills = val;
  }

  ngOnDestroy(): void {
    this.listSkillsSubscriptionRef.unsubscribe();
  }

  cancel() {
    this.destroy.emit();
  }

  submit() {}

  receiveImage(event: { file: File; fileName: string }) {
    this.file = event.file;
    this.fileName = event.fileName;
  }
}
