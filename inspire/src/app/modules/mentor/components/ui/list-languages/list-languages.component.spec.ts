import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLanguagesComponent } from './list-languages.component';

describe('ListLanguagesComponent', () => {
  let component: ListLanguagesComponent;
  let fixture: ComponentFixture<ListLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListLanguagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
