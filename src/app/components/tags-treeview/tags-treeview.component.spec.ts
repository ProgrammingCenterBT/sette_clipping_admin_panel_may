import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsTreeviewComponent } from './tags-treeview.component';

describe('TagsTreeviewComponent', () => {
  let component: TagsTreeviewComponent;
  let fixture: ComponentFixture<TagsTreeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsTreeviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
