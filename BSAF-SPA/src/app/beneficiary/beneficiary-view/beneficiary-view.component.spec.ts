import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryViewComponent } from './beneficiary-view.component';

describe('BeneficiaryViewComponent', () => {
  let component: BeneficiaryViewComponent;
  let fixture: ComponentFixture<BeneficiaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
