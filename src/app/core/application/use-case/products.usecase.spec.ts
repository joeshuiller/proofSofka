import { TestBed } from '@angular/core/testing';

import { ProductsUsecase } from './products.usecase';

describe('ProductsUsecase', () => {
  let service: ProductsUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
