import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ResponseReservation } from '../../../../../shared/models/reservation';
import { auditTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-reservation-with-swipe',
  templateUrl: './reservation-with-swipe.component.html',
  styleUrl: './reservation-with-swipe.component.scss',
})
export class ReservationWithSwipeComponent implements AfterViewInit {
  @Input()
  reservation!: ResponseReservation;
  @Input()
  bgColor: string = 'transparent';
  @ViewChild('thisRef')
  elementRef!: ElementRef;
  startingPosition!: number;
  offsetRight = 0;
  showAction = false;

  ngAfterViewInit(): void {
    fromEvent<TouchEvent>(
      this.elementRef.nativeElement,
      'touchstart'
    ).subscribe((ele: TouchEvent) => {
      ele.stopPropagation();
      ele.preventDefault();
      console.log(ele);
      this.startingPosition = ele.touches[0].clientX;
      ele.stopPropagation();
    });

    fromEvent<TouchEvent>(this.elementRef.nativeElement, 'touchmove')
      .pipe(auditTime(20))
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

    fromEvent<TouchEvent>(this.elementRef.nativeElement, 'touchend').subscribe(
      (ele: TouchEvent) => {
        ele.stopPropagation();
        ele.preventDefault();
        const touch = ele.changedTouches[0];
        this.offsetRight = touch.clientX - this.startingPosition;

        // if (this.showAction) {

        // } else
        if (this.offsetRight > 75) {
          this.elementRef.nativeElement.style.transform = `translateX(150px)`;
          this.showAction = true;
        } else {
          this.elementRef.nativeElement.style.transform = `translateX(0px)`;
          this.showAction = false;
        }
      }
    );

    fromEvent(this.elementRef.nativeElement, 'click').subscribe(
      (ele) =>
        (this.elementRef.nativeElement.style.transform = `translateX(0px)`)
    );
  }

  delete() {
    this.showAction = false;
    this.elementRef.nativeElement.style.transform = `translateX(0px)`;
  }
}
