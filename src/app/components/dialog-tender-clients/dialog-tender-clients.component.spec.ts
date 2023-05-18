import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTenderClientsComponent } from './dialog-tender-clients.component';

describe('DialogTenderClientsComponent', () => {
  let component: DialogTenderClientsComponent;
  let fixture: ComponentFixture<DialogTenderClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTenderClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTenderClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
