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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Skill } from '../../../shared/models/chip';
import { UserService } from '../../../user.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Mentor, Student } from '../../../shared/models/user';

@Component({
  selector: 'app-form-edit-apropos',
  templateUrl: './form-edit-apropos.component.html',
  styleUrl: './form-edit-apropos.component.scss',
})
export class FormEditAproposComponent implements OnInit, OnDestroy {
  aproposForm!: FormGroup<any>;
  @Output() destroy = new EventEmitter();
  @Output() profilEmitter = new EventEmitter<{
    profil: Mentor | Student;
    skills: Skill[];
  }>();
  @Input() selectedSkills!: Skill[];
  skills!: Skill[];

  destroyRef = inject(DestroyRef);
  listSkills$ = inject(UserService).getListSkills();

  onSubmit() {
    this.profilEmitter.emit({
      profil: this.aproposForm.value,
      skills: this.selectedSkills,
    });
    this.destroy.emit();
  }

  listSkillsSubscriptionRef!: Subscription;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.aproposForm = this.fb.group({
      title: [''],
      imgUrl: [''],
      linkedinUrl: [''],
      githubUrl: [''],
      firstname: [''],
      lastname: [''],
      description: [''],
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
}
