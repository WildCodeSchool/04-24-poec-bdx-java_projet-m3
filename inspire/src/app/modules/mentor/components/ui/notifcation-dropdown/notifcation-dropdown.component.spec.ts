import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcationDropdownComponent } from './notifcation-dropdown.component';

describe('NotifcationDropdownComponent', () => {
  let component: NotifcationDropdownComponent;
  let fixture: ComponentFixture<NotifcationDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotifcationDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifcationDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
