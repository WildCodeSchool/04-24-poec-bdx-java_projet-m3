import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfilByMentorComponent } from './student-profil-by-mentor.component';

describe('StudentProfilByMentorComponent', () => {
  let component: StudentProfilByMentorComponent;
  let fixture: ComponentFixture<StudentProfilByMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentProfilByMentorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentProfilByMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
