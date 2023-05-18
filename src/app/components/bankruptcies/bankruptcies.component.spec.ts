import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankruptciesComponent } from './bankruptcies.component';

describe('BankruptciesComponent', () => {
  let component: BankruptciesComponent;
  let fixture: ComponentFixture<BankruptciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankruptciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankruptciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
