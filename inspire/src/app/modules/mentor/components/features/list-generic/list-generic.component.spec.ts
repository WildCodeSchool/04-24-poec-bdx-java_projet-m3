import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGenericComponent } from './list-generic.component';

describe('ListGenericComponent', () => {
  let component: ListGenericComponent;
  let fixture: ComponentFixture<ListGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListGenericComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
