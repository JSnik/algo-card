import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSelectionComponent } from './after-selection.component';

describe('AfterSelectionComponent', () => {
  let component: AfterSelectionComponent;
  let fixture: ComponentFixture<AfterSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
