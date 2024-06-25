import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorReservationPageByStudentComponent } from './mentor-reservation-page-by-student.component';

describe('MentorReservationPageByStudentComponent', () => {
  let component: MentorReservationPageByStudentComponent;
  let fixture: ComponentFixture<MentorReservationPageByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentorReservationPageByStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MentorReservationPageByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
