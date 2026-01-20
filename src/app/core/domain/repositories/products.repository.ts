import { Observable } from "rxjs";
import { ProductModel } from "../models/product.model";
import { ProductsDto } from "../../infrastructure/dtos/products.dto";


export abstract class IProductsRepository {
  abstract getData(): Observable<ProductModel[]>;
  abstract getDataById(id: string): Observable<ProductModel>;
  abstract saveData(product: ProductsDto): Observable<ProductModel>;
  abstract deleteData(id: string): Observable<boolean>;
}
