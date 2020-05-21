import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDeleteDialogComponent } from './individual-delete-dialog.component';

describe('IndividualDeleteDialogComponent', () => {
  let component: IndividualDeleteDialogComponent;
  let fixture: ComponentFixture<IndividualDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
