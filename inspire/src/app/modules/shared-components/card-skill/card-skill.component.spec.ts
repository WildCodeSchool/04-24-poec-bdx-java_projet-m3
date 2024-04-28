import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSkillComponent } from './card-skill.component';

describe('CardSkillComponent', () => {
  let component: CardSkillComponent;
  let fixture: ComponentFixture<CardSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSkillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
