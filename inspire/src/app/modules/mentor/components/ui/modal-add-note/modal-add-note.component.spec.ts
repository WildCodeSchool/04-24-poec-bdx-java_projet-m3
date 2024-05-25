import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddNoteComponent } from './modal-add-note.component';

describe('ModalAddNoteComponent', () => {
  let component: ModalAddNoteComponent;
  let fixture: ComponentFixture<ModalAddNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAddNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
