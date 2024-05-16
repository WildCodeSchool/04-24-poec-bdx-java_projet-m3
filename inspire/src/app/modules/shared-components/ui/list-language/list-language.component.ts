import { Component, Input, inject } from '@angular/core';
import { Language } from '../../../../shared/models/language';
import { MentorService } from '../../../../shared/services/mentor.service';
import { Subscription } from 'rxjs';
type responseLanguageUpdate = {
  success: string;
  message: string;
};

@Component({
  selector: 'app-list-language',
  templateUrl: './list-language.component.html',
  styleUrl: './list-language.component.scss',
})
export class ListLanguageComponent {
  @Input() title: string = '';
  @Input() languages!: Language[];
  isModalVisible = false;

  mentorService = inject(MentorService);
  mentorSubscription!: Subscription;

  showEditModal() {
    this.isModalVisible = true;
  }

  hideEditModal() {
    this.isModalVisible = false;
  }

  updateListLanguages(newLanguageList: Language[]) {
    this.mentorSubscription = this.mentorService
      .updateMentorLanguagesList(newLanguageList)
      .subscribe((res) => {
        if (res.success) {
          this.mentorService.activeMentor$.next({
            ...this.mentorService.activeMentor$.value,
            languages: newLanguageList,
          });
        }

        this.mentorSubscription.unsubscribe();

        this.hideEditModal();
      });
  }
}
