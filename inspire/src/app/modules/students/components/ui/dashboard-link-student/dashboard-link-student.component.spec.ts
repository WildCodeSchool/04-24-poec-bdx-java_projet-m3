import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLinkStudentComponent } from './dashboard-link-student.component';

describe('DashboardLinkStudentComponent', () => {
  let component: DashboardLinkStudentComponent;
  let fixture: ComponentFixture<DashboardLinkStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLinkStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardLinkStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
