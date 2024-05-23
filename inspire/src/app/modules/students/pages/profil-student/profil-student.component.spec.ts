import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilStudentComponent } from './profil-student.component';

describe('ProfilStudentComponent', () => {
  let component: ProfilStudentComponent;
  let fixture: ComponentFixture<ProfilStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
