import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormationComponent } from './card-formation.component';

describe('CardFormationComponent', () => {
  let component: CardFormationComponent;
  let fixture: ComponentFixture<CardFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFormationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
