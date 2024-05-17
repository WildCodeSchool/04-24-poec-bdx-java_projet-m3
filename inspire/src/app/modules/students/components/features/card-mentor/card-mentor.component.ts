import { Component, Input, OnInit, inject } from '@angular/core';
import { Mentor } from '../../../../../shared/models/user';
import { Skill } from '../../../../../shared/models/chip';
import { MentorService } from '../../../../../shared/services/mentor.service';
import { Observable } from 'rxjs';
import { FavoritesService } from '../../../shared/favorites.service';

@Component({
  selector: 'app-card-mentor',
  templateUrl: './card-mentor.component.html',
  styleUrl: './card-mentor.component.scss'
})
export class CardMentorComponent implements OnInit {

  @Input()
  mentor!: Mentor;

  isFavorite: boolean = false;

  constructor(private favoritesService: FavoritesService) {}

  skillList$?: Observable<Skill[]>;
  mentorService = inject(MentorService);

   ngOnInit(): void {
    this.skillList$ = this.mentorService.getMentorSkillsById(this.mentor.userId)
     console.log("mentor:", this.mentor)
   }

   toggleFavorite(): void {
    if (this.isFavorite) { this.isFavorite = false;
      this.favoritesService.removeFromFavorites(this.mentor.userId).subscribe(() => {
        this.isFavorite = false;
      }, error => {
        console.error('Error removing from favorites:', error);
      });
    } else { this.isFavorite = true;
      this.favoritesService.addToFavorites(this.mentor.userId).subscribe(() => {
        this.isFavorite = true;
      }, error => {
        console.error('Error adding to favorites:', error);
      });
    }
}
}
