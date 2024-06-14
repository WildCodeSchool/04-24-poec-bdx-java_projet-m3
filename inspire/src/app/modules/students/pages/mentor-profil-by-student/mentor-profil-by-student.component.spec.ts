import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorProfilByStudentComponent } from './mentor-profil-by-student.component';

describe('MentorProfilByStudentComponent', () => {
  let component: MentorProfilByStudentComponent;
  let fixture: ComponentFixture<MentorProfilByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MentorProfilByStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MentorProfilByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
