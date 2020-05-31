import { TestBed } from '@angular/core/testing';

import { CreateBenefFormListsService } from './create-benef-form-lists.service';

describe('CreateBenefFormListsService', () => {
  let service: CreateBenefFormListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBenefFormListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
