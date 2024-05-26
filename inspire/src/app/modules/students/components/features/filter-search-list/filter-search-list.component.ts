import { Component, DestroyRef, EventEmitter, Output } from '@angular/core';
import { Skill } from '../../../../../shared/models/chip';
import { Mentor, MentorDTO } from '../../../../../shared/models/user';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { UserService } from '../../../../../user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor(
    private _mentorService: MentorService,
    private _userService: UserService,
    private _destroyRef: DestroyRef // private _mentorService: MentorServiceService, // private _mentorDetailsService: MentorService // Service pour obtenir les détails des compétences des mentors
  ) {
    this.skills = [
      { name: 'javascript' },
      { name: 'java' },
      { name: 'Angular' },
      { name: 'React' },
      { name: 'CSS' },
    ];

    this.disponibily = [
      { name: "Aujourd'hui" },
      { name: 'Dans la semaine' },
      { name: 'Peu importe' },
    ];

    this.mode = [{ name: 'Presentiel' }, { name: 'Distanciel' }];

    this.level = [
      { name: "Moins d'un an" },
      { name: 'Entre 1 et 2 ans' },
      { name: 'Entre 2 et 5 ans' },
    ];
  }

  filterMentorsBySkills() {
    if (this.selectedSkill && this.selectedSkill.length > 0) {
      this._mentorService
        .getMentorsList()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((mentors) => {
          let filteredMentors: MentorDTO[] = [];
          let completedRequests = 0;
          mentors.forEach((mentor) => {
            this._userService
              .getMentorSkillsById(mentor.userId)
              .pipe(takeUntilDestroyed(this._destroyRef))
              .subscribe((skills) => {
                if (
                  this.selectedSkill.every((skill) =>
                    skills.some(
                      (mentorSkill) => mentorSkill.name === skill.name
                    )
                  )
                ) {
                  filteredMentors.push(mentor);
                }
                completedRequests++;
                if (completedRequests === mentors.length) {
                  this.filteredMentors.emit(filteredMentors);
                }
              });
          });
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
