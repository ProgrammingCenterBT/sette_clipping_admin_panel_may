import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersSearchbarComponent } from './tenders-searchbar.component';

describe('TendersSearchbarComponent', () => {
  let component: TendersSearchbarComponent;
  let fixture: ComponentFixture<TendersSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TendersSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TendersSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
