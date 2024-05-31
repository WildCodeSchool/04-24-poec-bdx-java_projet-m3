import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelReservationComponent } from './modal-cancel-reservation.component';

describe('ModalCancelReservationComponent', () => {
  let component: ModalCancelReservationComponent;
  let fixture: ComponentFixture<ModalCancelReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCancelReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCancelReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
