import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankruptciesSearchbarComponent } from './bankruptcies-searchbar.component';

describe('BankruptciesSearchbarComponent', () => {
  let component: BankruptciesSearchbarComponent;
  let fixture: ComponentFixture<BankruptciesSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankruptciesSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankruptciesSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
