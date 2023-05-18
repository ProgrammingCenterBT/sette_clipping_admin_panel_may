import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClipGroupComponent } from './dialog-clip-group.component';

describe('DialogClipGroupComponent', () => {
  let component: DialogClipGroupComponent;
  let fixture: ComponentFixture<DialogClipGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClipGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClipGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
