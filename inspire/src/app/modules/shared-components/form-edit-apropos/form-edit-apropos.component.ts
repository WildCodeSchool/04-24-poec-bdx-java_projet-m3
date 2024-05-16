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

@Component({
  selector: 'app-form-edit-apropos',
  templateUrl: './form-edit-apropos.component.html',
  styleUrl: './form-edit-apropos.component.scss',
})
export class FormEditAproposComponent implements OnInit, OnDestroy {
  aproposForm!: FormGroup<any>;
  @Output() destroy = new EventEmitter();
  skills!: Skill[];
  @Input() selectedSkills!: Skill[];

  listSkills$ = inject(UserService).getListSkills();

  onSubmit() {}

  listSkillsSubscriptionRef!: Subscription;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.aproposForm = this.fb.group({
      title: [''],
      imgUrl: [''],
      linkedinUrl: [''],
      githubUrl: [''],
      description: [''],
      selectedSkills: new FormControl<Skill[] | null>(this.selectedSkills),
    });
    this.listSkillsSubscriptionRef = this.listSkills$.subscribe(
      (res) => (this.skills = res)
    );
  }

  ngOnDestroy(): void {
    this.listSkillsSubscriptionRef.unsubscribe();
  }

  cancel() {
    this.destroy.emit();
  }

  submit() {
    this.destroy.emit();
  }
}
