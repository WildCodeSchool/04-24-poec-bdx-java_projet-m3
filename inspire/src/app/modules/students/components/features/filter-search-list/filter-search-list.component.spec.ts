import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchListComponent } from './filter-search-list.component';

describe('FilterSearchListComponent', () => {
  let component: FilterSearchListComponent;
  let fixture: ComponentFixture<FilterSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterSearchListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
