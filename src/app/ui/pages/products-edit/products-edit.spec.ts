import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEdit } from './products-edit';

describe('ProductsEdit', () => {
  let component: ProductsEdit;
  let fixture: ComponentFixture<ProductsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
