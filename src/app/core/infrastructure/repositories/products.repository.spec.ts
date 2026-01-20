import { TestBed } from '@angular/core/testing';

import { ProductsRepository } from './products.repository';

describe('ProductsRepository', () => {
  let service: ProductsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
