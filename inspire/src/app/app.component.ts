import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { User } from './shared/models/user';
import { Subscription } from 'rxjs';
import { LoginService } from './shared/services/login.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from './shared/services/user.service';
import { UserStoreService } from './shared/services/stores/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userDansLeLocalStorage!: User;
  router = inject(Router);
  destropyRef = inject(DestroyRef);
  isLoading$ = inject(UserService).isLoading$;
  userStoreService = inject(UserStoreService);

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loginService
        .getUserByToken(token)
        .pipe(takeUntilDestroyed(this.destropyRef))
        .subscribe((res) => {
          if (res.role) {
            console.log('redirecting to menotr or student');
            this.userStoreService.setUserConnected(res);

            res.role === 'MENTOR'
              ? this.router.navigateByUrl('/mentor')
              : this.router.navigateByUrl('/student');
          }
        });
      console.log('fail redirect');
    }
  }
}
