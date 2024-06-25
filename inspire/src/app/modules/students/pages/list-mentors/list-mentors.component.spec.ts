import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMentorsComponent } from './list-mentors.component';

describe('ListMentorsComponent', () => {
  let component: ListMentorsComponent;
  let fixture: ComponentFixture<ListMentorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMentorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
