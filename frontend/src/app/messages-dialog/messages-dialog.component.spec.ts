import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesDialogComponent } from './messages-dialog.component';

describe('MessagesDialogComponent', () => {
  let component: MessagesDialogComponent;
  let fixture: ComponentFixture<MessagesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesDialogComponent]
    });
    fixture = TestBed.createComponent(MessagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
