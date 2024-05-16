import { Component, EventEmitter, Output } from '@angular/core';
import { Skill } from '../../../../../shared/models/chip';
import { MentorServiceService } from '../../../shared/mentor-service.service';
import { Mentor } from '../../../../../shared/models/user';
import { MentorService } from '../../../../../shared/services/mentor.service';

@Component({
  selector: 'app-filter-search-list',
  templateUrl: './filter-search-list.component.html',
  styleUrl: './filter-search-list.component.scss',
})
export class FilterSearchListComponent {
  skills: Skill[] = [];
  mode: any[] = [];
  level: any[] = [];

  selectedSkill: Skill[] = [];
  selectedMode: any[] = [];
  selectedLevel: any[] = [];

  @Output() filteredMentors = new EventEmitter<Mentor[]>();

  constructor(
    private _mentorService: MentorServiceService,
    private _mentorDetailsService: MentorService // Service pour obtenir les détails des compétences des mentors
  ) {
    this.skills = [
      { name: 'javascript' },
      { name: 'java' },
      { name: 'Angular' },
      { name: 'React' },
      { name: 'CSS' },
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
      this._mentorService.getMentorsList$().subscribe((mentors) => {
        let filteredMentors: Mentor[] = [];
        let completedRequests = 0;
        mentors.forEach((mentor) => {
          this._mentorDetailsService
            .getMentorSkillsById(mentor.userId)
            .subscribe((skills) => {
              if (
                this.selectedSkill.every((skill) =>
                  skills.some((mentorSkill) => mentorSkill.name === skill.name)
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
      this._mentorService.getMentorsList$().subscribe((mentorList) => {
        this.filteredMentors.emit(mentorList);
      });
    }
  }

  resetFilters() {
    this.selectedSkill = [];
    this.selectedMode = [];
    this.selectedLevel = [];

    this._mentorService.getMentorsList$().subscribe((mentorList) => {
      this.filteredMentors.emit(mentorList);
    });
  }
}
