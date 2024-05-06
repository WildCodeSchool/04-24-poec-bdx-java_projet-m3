import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChipComponent } from './list-chip.component';

describe('ListChipComponent', () => {
  let component: ListChipComponent;
  let fixture: ComponentFixture<ListChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
