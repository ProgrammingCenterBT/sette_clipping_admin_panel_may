import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClipTvRadioComponent } from './add-clip-tv-radio.component';

describe('AddClipTvRadioComponent', () => {
  let component: AddClipTvRadioComponent;
  let fixture: ComponentFixture<AddClipTvRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClipTvRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClipTvRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
