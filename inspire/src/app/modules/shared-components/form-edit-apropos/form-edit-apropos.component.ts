import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Skill } from '../../../shared/models/chip';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { MentorService } from '../../../shared/services/mentor.service';

type profilType = {
  title: string;
  firstname: string;
  lastname: string;
  imgUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  description: string;
  selectedSkills?: Skill[];
};

@Component({
  selector: 'app-form-edit-apropos',
  templateUrl: './form-edit-apropos.component.html',
  styleUrl: './form-edit-apropos.component.scss',
})
export class FormEditAproposComponent implements OnInit, OnDestroy {
  aproposForm!: FormGroup<any>;
  @Output() destroy = new EventEmitter();
  @Output() profilEmitter = new EventEmitter<profilType>();
  skills!: Skill[];
  @Input() selectedSkills!: Skill[];
  fullProfil!: profilType;

  mentorSubscription!: Subscription;
  mentorService = inject(MentorService);

  listSkills$ = inject(UserService).getListSkills();

  onSubmit() {
    console.log(this.aproposForm.value);
    this.submit();
  }

  listSkillsSubscriptionRef!: Subscription;
  constructor(private fb: FormBuilder) {}

  // new FormControl<Skill[] | null>(mentor.skills),

  ngOnInit(): void {
    const mentor = this.mentorService.activeMentor$.value;
    this.aproposForm = this.fb.group({
      title: [mentor.profil.title],
      firstname: [mentor.profil.firstname],
      lastname: [mentor.profil.lastname],
      imgUrl: [mentor.profil.imgUrl],
      linkedinUrl: [mentor.profil.linkedinUrl],
      githubUrl: [mentor.profil.githubUrl],
      description: [mentor.profil.description],
      selectedSkills: new FormControl<Skill[] | null>(mentor.skills),
    });
    this.listSkillsSubscriptionRef = this.listSkills$.subscribe(
      (res) => (this.skills = res)
    );
    this.fullProfil = mentor.profil;
  }

  ngOnDestroy(): void {
    this.listSkillsSubscriptionRef.unsubscribe();
  }

  cancel() {
    this.destroy.emit();
  }

  submit() {
    this.profilEmitter.emit({
      title: this.aproposForm.value.title,
      firstname: this.aproposForm.value.firstname,
      lastname: this.aproposForm.value.lastname,
      imgUrl: this.aproposForm.value.imgUrl,
      linkedinUrl: this.aproposForm.value.linkedinUrl,
      githubUrl: this.aproposForm.value.githubUrl,
      description: this.aproposForm.value.description,
      // selectedSkills: this.aproposForm.value.selectedSkills,
    } as profilType);
    console.log('submit called');

    this.destroy.emit();
  }
}
