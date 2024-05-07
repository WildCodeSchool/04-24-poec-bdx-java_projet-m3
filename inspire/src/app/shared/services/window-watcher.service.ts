import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  auditTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
export type WindowSize = {
  height: number;
  width: string;
};
@Injectable({
  providedIn: 'root',
})
export class WindowWatcherService {
  windowSizeWatcher = fromEvent(window, 'resize')
    .pipe(
      auditTime(100),
      map(() => window.innerWidth >= 992),
      distinctUntilChanged()
    )
    .subscribe((ele) => {
      this.windowSizeChanged.next(ele);
    });

  windowSizeChanged = new BehaviorSubject<boolean>(window.innerWidth >= 890);
  constructor() {}
}
