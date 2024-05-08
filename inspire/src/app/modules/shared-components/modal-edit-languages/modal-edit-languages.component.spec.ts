import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditLanguagesComponent } from './modal-edit-languages.component';

describe('ModalEditLanguagesComponent', () => {
  let component: ModalEditLanguagesComponent;
  let fixture: ComponentFixture<ModalEditLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditLanguagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
