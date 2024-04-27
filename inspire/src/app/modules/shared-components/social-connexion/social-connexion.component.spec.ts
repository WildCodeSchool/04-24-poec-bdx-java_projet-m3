import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialConnexionComponent } from './social-connexion.component';

describe('SocialConnexionComponent', () => {
  let component: SocialConnexionComponent;
  let fixture: ComponentFixture<SocialConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialConnexionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
