import { TestBed } from '@angular/core/testing';

import { Payment.ManagementService } from './payment.management.service';

describe('Payment.ManagementService', () => {
  let service: Payment.ManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Payment.ManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
