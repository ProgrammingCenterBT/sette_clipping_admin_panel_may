import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NostrificationsComponent } from './nostrifications.component';

describe('NostrificationsComponent', () => {
  let component: NostrificationsComponent;
  let fixture: ComponentFixture<NostrificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NostrificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NostrificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
