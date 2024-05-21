import { Component, Input, OnInit, inject } from '@angular/core';
import { Mentor } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../../shared/favorites.service';
import { UserStoreService } from '../../../../../shared/services/stores/user-store.service';
import { UserService } from '../../../../../user.service';

@Component({
  selector: 'app-card-mentor',
  templateUrl: './card-mentor.component.html',
  styleUrls: ['./card-mentor.component.scss']
})
export class CardMentorComponent implements OnInit {
  @Input() mentor!: Mentor;

  isFavorite: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private userStoreService: UserStoreService
  ) {}

  skillList$?: Observable<Skill[]>;
  
userService = inject(UserService);

  ngOnInit(): void {
    this.skillList$ = this.userService.getMentorSkillsById(this.mentor.userId);
    console.log("mentor:", this.mentor);
    this.checkIfFavorite();
  }

  checkIfFavorite(): void {
    const studentId = this.userStoreService.getUserId();
    if (studentId) {
      this.favoritesService.isFavorite(studentId, this.mentor.userId).subscribe(result => {
        this.isFavorite = result;
      }, error => {
        console.error('Error checking favorite status:', error);
      });
    }
  }

  toggleFavorite(): void {
    const studentId = this.userStoreService.getUserId();
    if (studentId) {
      if (this.isFavorite) {
        this.isFavorite = false;
        this.favoritesService.removeFromFavorites(studentId, this.mentor.userId).subscribe(() => {
          this.isFavorite = false;
        }, error => {
          console.error('Error removing from favorites:', error);
        });
      } else {
        this.isFavorite = true;
        this.favoritesService.addToFavorites(studentId, this.mentor.userId).subscribe(() => {
          this.isFavorite = true;
        }, error => {
          console.error('Error adding to favorites:', error);
        });
      }
    }
  }
}
