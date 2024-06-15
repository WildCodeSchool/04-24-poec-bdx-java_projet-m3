import {
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ReservationForStudentDTO } from '../../../../../shared/models/reservation';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReservationService } from '../../../../../shared/services/reservation.service';
import { UserStoreService } from '../../../../../shared/services/stores/user-store.service';

@Component({
  selector: 'app-student-reservation-with-swipe-upcoming',
  templateUrl: './student-reservation-with-swipe-upcoming.component.html',
  styleUrl: './student-reservation-with-swipe-upcoming.component.scss',
})
export class StudentReservationWithSwipeUpcomingComponent implements OnInit {
  @Input() reservation!: ReservationForStudentDTO;
  @Input() bgColor: string = 'transparent';
  @Input() isHistory: boolean = false;
  @ViewChild('thisRef') elementRef!: ElementRef;
  startingPosition!: number;
  offsetRight = 0;
  showAction = false;
  modalVisible: boolean = false;
  newNote: string = 'RAS';

  destroyRef = inject(DestroyRef);
  reservationService = inject(ReservationService);
  user = inject(UserStoreService).getUserConnected$();

  ngOnInit(): void {
    this.newNote = this.reservation.message || 'RAS';
  }

  ngAfterViewInit(): void {
    fromEvent<TouchEvent>(this.elementRef.nativeElement, 'touchstart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ele: TouchEvent) => {
        ele.stopPropagation();
        ele.preventDefault();
        this.startingPosition = ele.touches[0].clientX;
      });

    fromEvent<TouchEvent>(this.elementRef.nativeElement, 'touchmove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ele: TouchEvent) => {
        ele.stopPropagation();
        ele.preventDefault();
        const touch = ele.changedTouches[0];
        if (touch.clientX - this.startingPosition > 0) {
          this.offsetRight =
            touch.clientX - this.startingPosition < 150
              ? touch.clientX - this.startingPosition
              : 150;
          this.elementRef.nativeElement.style.transform = `translateX(${this.offsetRight}px)`;
        }
      });

    fromEvent<TouchEvent>(this.elementRef.nativeElement, 'touchend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((ele: TouchEvent) => {
        ele.stopPropagation();
        ele.preventDefault();
        const touch = ele.changedTouches[0];
        this.offsetRight = touch.clientX - this.startingPosition;

        if (this.offsetRight > 75) {
          this.elementRef.nativeElement.style.transform = `translateX(150px)`;
          this.showAction = true;
        } else {
          this.elementRef.nativeElement.style.transform = `translateX(0px)`;
          this.showAction = false;
        }
      });

    fromEvent(this.elementRef.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (ele) =>
          (this.elementRef.nativeElement.style.transform = `translateX(0px)`)
      );
  }

  delete() {
    this.showAction = false;
    this.elementRef.nativeElement.style.transform = `translateX(0px)`;
    this.modalVisible = true;
  }

  showModalNote() {
    this.modalVisible = true;
  }

  cancel() {
    this.modalVisible = false;
  }

  updateReservation() {
    this.reservationService.removeReservationByStudent(
      this.reservation.id,
      this.user.value.id
    );
    this.reservation.message = this.newNote;
    this.modalVisible = false;
  }

  removeReservation() {
    console.log(this.reservation.id, this.user.value.id);

    this.reservationService
      .removeReservationByStudent(
        this.reservation.reservationId,
        this.user.value.id
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.modalVisible = false;
  }
}
