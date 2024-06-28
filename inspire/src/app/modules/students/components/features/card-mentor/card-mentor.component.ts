import { Component, Input, OnInit, inject } from '@angular/core';
import { MentorDTO } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../../shared/favorites.service';
import { UserStoreService } from '../../../../../shared/services/stores/user-store.service';
import { StudentService } from '../../../../../shared/services/student.service';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { UserByIdService } from '../../../../../shared/services/user-by-id.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../../shared/services/user.service';

@Component({
  selector: 'app-card-mentor',
  templateUrl: './card-mentor.component.html',
  styleUrls: ['./card-mentor.component.scss'],
})
export class CardMentorComponent implements OnInit {
  @Input() mentor!: MentorDTO;

  isFavorite: boolean = false;
  mentorId!: number;
  studentId!: number;
  router = inject(Router);

  constructor(
    private favoritesService: FavoritesService,
    private userStoreService: UserStoreService,
    private studentService: StudentService,
    private mentorService: MentorService,
    private userIdService: UserByIdService
  ) {}

  skillList$?: Observable<Skill[]>;

  userService = inject(UserService);

  ngOnInit(): void {
    this.skillList$ = this.userIdService.getUserSkillsById(this.mentor.userId);
    this.checkIfFavorite();
  }

  checkIfFavorite(): void {
    const studentId = this.userStoreService.getUserId();
    if (studentId) {
      this.favoritesService
        .isFavorite(
          this.studentService.activeStudentProfil$.value.id,
          this.mentor.id
        )
        .subscribe(
          (result) => {
            this.isFavorite = result.isFavorite;
          },
          (error) => {
            console.error('Error checking favorite status:', error);
          }
        );
    }
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    const studentId = this.userStoreService.getUserId();
    if (studentId) {
      console.log(
        'studentService.activeStudentProfil$.value.id:',
        this.studentService.activeStudentProfil$.value.id
      );
      if (this.isFavorite) {
        this.isFavorite = true;
        this.favoritesService
          .removeFromFavorites(
            this.studentService.activeStudentProfil$.value.id || 0,
            this.mentor.id || 0
          )
          .subscribe(
            () => {
              this.isFavorite = false;
            },
            (error) => {
              console.error('Error removing from favorites:', error);
            }
          );
      } else {
        this.isFavorite = true;
        this.favoritesService
          .addToFavorites(
            this.studentService.activeStudentProfil$.value.id || 0,
            this.mentor.id || 0
          )
          .subscribe(
            () => {
              this.isFavorite = true;
            },
            (error) => {
              console.error('Error adding to favorites:', error);
            }
          );
      }
    }
  }

  navigateToAgenda(event: Event) {
    event.stopPropagation();
    this.router.navigateByUrl('/student/reserve/' + this.mentor.userId);
  }
}
