import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentReservationComponent } from './list-student-reservation.component';

describe('ListStudentReservationComponent', () => {
  let component: ListStudentReservationComponent;
  let fixture: ComponentFixture<ListStudentReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListStudentReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListStudentReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
