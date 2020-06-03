import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangePassDialogComponent } from './admin-change-pass-dialog.component';

describe('AdminChangePassDialogComponent', () => {
  let component: AdminChangePassDialogComponent;
  let fixture: ComponentFixture<AdminChangePassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangePassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangePassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
