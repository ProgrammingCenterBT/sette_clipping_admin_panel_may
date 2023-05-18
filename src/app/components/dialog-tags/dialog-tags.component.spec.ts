import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagsComponent } from './dialog-tags.component';

describe('DialogTagsComponent', () => {
  let component: DialogTagsComponent;
  let fixture: ComponentFixture<DialogTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
