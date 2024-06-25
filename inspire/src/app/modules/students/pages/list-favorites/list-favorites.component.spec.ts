import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoritesComponent } from './list-favorites.component';

describe('ListFavoritesComponent', () => {
  let component: ListFavoritesComponent;
  let fixture: ComponentFixture<ListFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
