import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowReservationComponent } from './row-reservation-student.component';

describe('RowReservationComponent', () => {
  let component: RowReservationComponent;
  let fixture: ComponentFixture<RowReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RowReservationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
