import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDialogComponent } from './individual-dialog.component';

describe('IndividualDialogComponent', () => {
  let component: IndividualDialogComponent;
  let fixture: ComponentFixture<IndividualDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
