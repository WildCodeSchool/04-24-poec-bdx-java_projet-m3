import { Component, OnInit, inject } from '@angular/core';
import { UserStoreService } from '../../../../../../shared/services/stores/user-store.service';
import { BehaviorSubject } from 'rxjs';
import { User, UserDTO } from '../../../../../../shared/models/user';

@Component({
  selector: 'app-role-register-page',
  templateUrl: './role-register-page.component.html',
  styleUrl: './role-register-page.component.scss',
})
export class RoleRegisterPageComponent implements OnInit {
  user$?: BehaviorSubject<UserDTO>;
  private userStore = inject(UserStoreService);

  ngOnInit(): void {
    this.user$ = this.userStore.getUserConnected$();
  }
}
