import { TestBed } from '@angular/core/testing';

import { BeneficiaryResolverService } from './beneficiary-resolver.service';

describe('BeneficiaryResolverService', () => {
  let service: BeneficiaryResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
