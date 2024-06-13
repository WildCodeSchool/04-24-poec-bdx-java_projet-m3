import { Component, DestroyRef, EventEmitter, Output } from '@angular/core';
import { Skill } from '../../../../../shared/models/chip';
import { MentorDTO } from '../../../../../shared/models/user';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { UserService } from '../../../../../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterService } from '../../../shared/filter.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter-search-list',
  templateUrl: './filter-search-list.component.html',
  styleUrl: './filter-search-list.component.scss',
})
export class FilterSearchListComponent {
  skills: Skill[] = [];
  disponibily: any[] = [];
  level: any[] = [];

  selectedSkill: Skill[] = [];
  selectedDisponibily: any[] = [];
  selectedLevel: any[] = [];
  mode: { name: string }[] = [];

  @Output() filteredMentors = new EventEmitter<MentorDTO[]>();
  private unsubscribe$ = new Subject<void>();


  constructor(
    private _mentorService: MentorService,
    private _userService: UserService,
    private _destroyRef: DestroyRef,
    private _filterService: FilterService,
  ) {
  
    this.disponibily = [
      { name: "Aujourd'hui" },
      { name: 'Dans la semaine' },
      { name: 'Peu importe' },
    ];

    this.level = [
      { name: "Moins d'un an" },
      { name: 'Entre 1 et 2 ans' },
      { name: 'Entre 2 et 5 ans' },
    ];
  }

  skillList$?: Observable<Skill[]>;


  ngOnInit(): void {
    this._filterService.getSkillList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(skills => {
        this.skills = skills;
        console.log("skills:", this.skills)
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filterMentorsBySkills() {
    if (this.selectedSkill && this.selectedSkill.length > 0) {
      const skillNames = this.selectedSkill.map(skill => skill.name);
      this._mentorService
        .getMentorsBySkills(skillNames)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((filteredMentors) => {
          this.filteredMentors.emit(filteredMentors);
        });
    } else {
      this._mentorService
        .getMentorsList()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((mentorList) => {
          this.filteredMentors.emit(mentorList);
        });
    }
  }

  resetFilters() {
    this.selectedSkill = [];
    this.selectedDisponibily = [];
    this.selectedLevel = [];

    this._mentorService
      .getMentorsList()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((mentorList) => {
        this.filteredMentors.emit(mentorList);
      });
  }
}
