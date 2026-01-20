import { TestBed } from '@angular/core/testing';

import { BaseHttpRepository } from './base-http.repository';

describe('BaseHttpRepository', () => {
  let service: BaseHttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseHttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
