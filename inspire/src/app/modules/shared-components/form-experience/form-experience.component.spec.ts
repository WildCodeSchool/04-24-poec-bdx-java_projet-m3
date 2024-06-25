import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExperienceComponent } from './form-experience.component';

describe('FormExperienceComponent', () => {
  let component: FormExperienceComponent;
  let fixture: ComponentFixture<FormExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
