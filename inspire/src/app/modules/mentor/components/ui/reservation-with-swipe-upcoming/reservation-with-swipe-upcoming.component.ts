import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { reservationForMentorDTO } from '../../../../../shared/models/reservation';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReservationService } from '../../../../../shared/services/reservation.service';
import { UserStoreService } from '../../../../../shared/services/stores/user-store.service';
import { WindowWatcherService } from '../../../../../shared/services/window-watcher.service';

@Component({
  selector: 'app-reservation-with-swipe-upcoming',
  templateUrl: './reservation-with-swipe-upcoming.component.html',
  styleUrl: './reservation-with-swipe-upcoming.component.scss',
})
export class ReservationWithSwipeComponentUpcoming
  implements AfterViewInit, OnInit, OnChanges
{
  @Input() reservation!: reservationForMentorDTO;
  @Input() bgColor: string = 'transparent';
  @Input() isHistory: boolean = false;
  @ViewChild('thisRef') elementRef!: ElementRef;
  startingPosition!: number;
  offsetRight = 0;
  showAction = false;
  modalCancelReservation: boolean = false;
  modalEditMessage: boolean = false;
  newNote: string = '<p>Pas de comentaires</p>';

  destroyRef = inject(DestroyRef);
  connectedUser = inject(UserStoreService).getUserConnected$();
  reservationService = inject(ReservationService);
  phoneMode = inject(WindowWatcherService).windowSizeChanged;

  ngOnInit(): void {
    this.newNote = this.reservation.message || '';
  }
  ngOnChanges(changes: SimpleChanges): void {}

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
    this.modalCancelReservation = true;
  }

  showModalNote() {
    this.modalEditMessage = true;
    this.elementRef.nativeElement.style.transform = `translateX(0px)`;
  }
  showCancelModal() {
    this.modalEditMessage = true;
    this.elementRef.nativeElement.style.transform = `translateX(0px)`;
  }

  cancel() {
    this.modalCancelReservation = false;
    this.elementRef.nativeElement.style.transform = `translateX(0px)`;
  }

  updateReservation(event: string) {
    this.reservation.message = event;
    this.modalEditMessage = false;
    this.reservationService
      .updateMentorReservationHistoryList(
        this.reservation.id,
        this.connectedUser.value?.id || 0,
        event
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  deleteReservation() {
    this.reservationService
      .removeMentorReservation(
        this.reservation.id,
        this.connectedUser.value?.id || 0
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.modalCancelReservation = false;
      });
  }
}
