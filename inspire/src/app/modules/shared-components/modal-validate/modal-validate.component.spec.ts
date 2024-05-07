import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidateComponent } from './modal-validate.component';

describe('ModalValidateComponent', () => {
  let component: ModalValidateComponent;
  let fixture: ComponentFixture<ModalValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalValidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
