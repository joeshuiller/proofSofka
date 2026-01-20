import { Component, inject } from '@angular/core';
import { Router } from 'express';
import { ProductsUsecase } from '../../../core/application/use-case/products.usecase';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList {
  private products= inject(ProductsUsecase);
  constructor() {
   this.products.getData();
   console.log(this.products.productsList());
  }

}
