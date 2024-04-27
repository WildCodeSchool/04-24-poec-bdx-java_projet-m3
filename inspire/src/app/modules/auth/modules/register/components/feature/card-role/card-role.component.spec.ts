import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoleComponent } from './card-role.component';

describe('CardRoleComponent', () => {
  let component: CardRoleComponent;
  let fixture: ComponentFixture<CardRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
