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
  public ProductsMapper = new ProductsMapper();

  getData(): Observable<ResponseModel> {
    return this.getAll() as unknown as Observable<ResponseModel>;
  }
  getDataById(id: string): Observable<Response> {
    return this.getById(id) as unknown as Observable<Response>;
  }
  saveData(product: ProductsDto): Observable<Response> {
    const data = this.ProductsMapper.mapFromUi(product);
    const dataOrd = this.ProductsMapper.mapToUi(data);
    return this.create(data) as unknown as Observable<Response>;
  }
  deleteData(id: string): Observable<boolean> {
    return this.delete(id) as unknown as Observable<boolean>;
  }
  editData(id: string, product: ProductsDto): Observable<boolean> {
    const data = this.ProductsMapper.mapFromUi(product);
    const dataOrd = this.ProductsMapper.mapToUi(data);
    return this.update(id, data) as unknown as Observable<boolean>;
  }
}
