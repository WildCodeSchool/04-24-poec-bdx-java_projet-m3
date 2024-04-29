import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRegisterPageComponent } from './role-register-page.component';

describe('RoleRegisterPageComponent', () => {
  let component: RoleRegisterPageComponent;
  let fixture: ComponentFixture<RoleRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoleRegisterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
