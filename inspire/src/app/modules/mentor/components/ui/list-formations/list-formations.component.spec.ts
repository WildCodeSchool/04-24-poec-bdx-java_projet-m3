import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormationsComponent } from './list-formations.component';

describe('ListFormationsComponent', () => {
  let component: ListFormationsComponent;
  let fixture: ComponentFixture<ListFormationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFormationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
