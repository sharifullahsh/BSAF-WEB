import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserChangePassDialogComponent } from './user-change-pass-dialog.component';


describe('AddUserDialogComponent', () => {
  let component: UserChangePassDialogComponent;
  let fixture: ComponentFixture<UserChangePassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangePassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
