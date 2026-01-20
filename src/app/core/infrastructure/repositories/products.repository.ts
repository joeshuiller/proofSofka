import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductModel } from '../../domain/models/product.model';
import { BaseHttpRepository } from './base-http.repository';
import { IProductsRepository } from '../../domain/repositories/products.repository';
import { Observable, raceWith } from 'rxjs';
import { ProductsDto } from '../dtos/products.dto';
import { ProductsMapper } from '../mappers/products.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductsRepository extends BaseHttpRepository<ProductModel> implements IProductsRepository {

  protected resourcePath = 'products';
  private ProductsMapper = new ProductsMapper();

  getData(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.apiUrl}`);
  }
  getDataById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.apiUrl}/${id}`);
  }
  saveData(product: ProductsDto): Observable<ProductModel> {
    const data = this.ProductsMapper.mapFromUi(product);
    return this.http.post<ProductModel>(this.apiUrl, data);
  }
  deleteData(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
