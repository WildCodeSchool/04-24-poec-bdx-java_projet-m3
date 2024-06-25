import { Component, DestroyRef, EventEmitter, Output } from '@angular/core';
import { Skill } from '../../../../../shared/models/chip';
import { MentorDTO } from '../../../../../shared/models/user';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { UserService } from '../../../../../user.service';
import { FilterService } from '../../../shared/filter.service';
import { Observable, Subject, forkJoin, takeUntil } from 'rxjs';

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

  @Output() filteredMentors = new EventEmitter<MentorDTO[]>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _mentorService: MentorService,
    private _filterService: FilterService
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
      { name: 'Plus de 5 ans' },
    ];
  }

  skillList$?: Observable<Skill[]>;

  ngOnInit(): void {
    this._filterService
      .getSkillList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((skills) => {
        this.skills = skills;
        console.log('skills:', this.skills);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  applyFilters() {
    const skillNames = this.selectedSkill.map((skill) => skill.name);
    const selectedDisponibily = this.selectedDisponibily.map((d) => d.name);
    const selectedLevel = this.selectedLevel.map((l) => l.name);

    let minYears = 0;
    let maxYears = Number.MAX_VALUE;

    if (selectedLevel.length > 0) {
      const selected = selectedLevel[0];
      switch (selected) {
        case "Moins d'un an":
          minYears = 0;
          maxYears = 1;
          break;
        case 'Entre 1 et 2 ans':
          minYears = 1;
          maxYears = 2;
          break;
        case 'Entre 2 et 5 ans':
          minYears = 2;
          maxYears = 5;
          break;
        case 'Plus de 5 ans':
          minYears = 5;
          maxYears = Number.MAX_VALUE;
          break;
        default:
          break;
      }
    }

    let period = '';
    if (selectedDisponibily.length > 0) {
      const selected = selectedDisponibily[0];
      switch (selected) {
        case "Aujourd'hui":
          period = 'day';
          break;
        case 'Dans la semaine':
          period = 'week';
          break;
        case 'Peu importe':
          period = 'any';
          break;
        default:
          break;
      }
    }

    const skillFilter$ =
      skillNames.length > 0
        ? this._mentorService.getMentorsBySkills(skillNames)
        : this._mentorService.getMentorsList();
    const availabilityFilter$ = period
      ? this._mentorService.getMentorsByAvailability(period)
      : this._mentorService.getMentorsList();
    const levelFilter$ =
      minYears !== 0 || maxYears !== Number.MAX_VALUE
        ? this._mentorService.getMentorsByExperienceYears(minYears, maxYears)
        : this._mentorService.getMentorsList();

    forkJoin([skillFilter$, availabilityFilter$, levelFilter$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([skillsResult, availabilityResult, levelResult]) => {
        const combinedResults = this.combineResults([
          skillsResult,
          availabilityResult,
          levelResult,
        ]);
        this.filteredMentors.emit(combinedResults);
      });
  }

  combineResults(results: MentorDTO[][]): MentorDTO[] {
    if (results.length === 0) {
      return [];
    }

    const [firstResult, ...restResults] = results;
    return firstResult.filter((mentor) =>
      restResults.every((result) => result.some((m) => m.id === mentor.id))
    );
  }

  resetFilters() {
    this.selectedSkill = [];
    this.selectedDisponibily = [];
    this.selectedLevel = [];

    this._mentorService
      .getMentorsList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((mentorList) => {
        this.filteredMentors.emit(mentorList);
      });
  }
}
