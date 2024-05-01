import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationWithSwipeComponent } from './reservation-with-swipe.component';

describe('ReservationWithSwipeComponent', () => {
  let component: ReservationWithSwipeComponent;
  let fixture: ComponentFixture<ReservationWithSwipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationWithSwipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationWithSwipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
