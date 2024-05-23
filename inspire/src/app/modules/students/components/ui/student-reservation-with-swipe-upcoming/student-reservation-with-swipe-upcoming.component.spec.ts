import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReservationWithSwipeUpcomingComponent } from './student-reservation-with-swipe-upcoming.component';

describe('StudentReservationWithSwipeUpcomingComponent', () => {
  let component: StudentReservationWithSwipeUpcomingComponent;
  let fixture: ComponentFixture<StudentReservationWithSwipeUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentReservationWithSwipeUpcomingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentReservationWithSwipeUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
