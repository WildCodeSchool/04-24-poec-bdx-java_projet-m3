import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMentorComponent } from './profil-mentor.component';

describe('ProfilMentorComponent', () => {
  let component: ProfilMentorComponent;
  let fixture: ComponentFixture<ProfilMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
