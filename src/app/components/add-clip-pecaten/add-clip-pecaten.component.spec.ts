import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClipPecatenComponent } from './add-clip-pecaten.component';

describe('AddClipPecatenComponent', () => {
  let component: AddClipPecatenComponent;
  let fixture: ComponentFixture<AddClipPecatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClipPecatenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClipPecatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
