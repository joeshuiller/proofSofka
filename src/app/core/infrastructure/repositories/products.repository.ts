import { Injectable } from '@angular/core';
import { ProductModel } from '../../domain/models/product.model';
import { BaseHttpRepository } from './base-http.repository';
import { IProductsRepository } from '../../domain/repositories/products.repository';
import { Observable } from 'rxjs';
import { ProductsDto } from '../dtos/products.dto';
import { ProductsMapper } from '../mappers/products.mapper';
import { ResponseModel, Response } from '../../domain/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsRepository extends BaseHttpRepository<ProductModel> implements IProductsRepository {

  protected resourcePath = 'products';
  private ProductsMapper = new ProductsMapper();

  getData(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}`);
  }
  getDataById(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }
  saveData(product: ProductsDto): Observable<Response> {
    const data = this.ProductsMapper.mapFromUi(product);
    return this.http.post<Response>(this.apiUrl, data);
  }
  deleteData(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
  editData(id: string, product: ProductsDto): Observable<boolean> {
    const data = this.ProductsMapper.mapFromUi(product);
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, data);
  }
}
