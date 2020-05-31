import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IndividualFormDialogComponent } from './individual-form-dialog.component';


describe('IndividualAddDialogComponent', () => {
  let component: IndividualFormDialogComponent;
  let fixture: ComponentFixture<IndividualFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
