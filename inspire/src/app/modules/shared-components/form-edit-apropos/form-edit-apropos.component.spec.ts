import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditAproposComponent } from './form-edit-apropos.component';

describe('FormEditAproposComponent', () => {
  let component: FormEditAproposComponent;
  let fixture: ComponentFixture<FormEditAproposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEditAproposComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEditAproposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
