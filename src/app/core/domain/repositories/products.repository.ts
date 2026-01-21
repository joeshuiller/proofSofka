import { Observable } from "rxjs";
import { ProductsDto } from "../../infrastructure/dtos/products.dto";
import { ResponseModel, Response } from "../models/response.model";


export abstract class IProductsRepository {
  abstract getData(): Observable<ResponseModel>;
  abstract getDataById(id: string): Observable<Response>;
  abstract saveData(product: ProductsDto): Observable<Response>;
  abstract deleteData(id: string): Observable<boolean>;
  abstract editData(id: string, product: ProductsDto): Observable<boolean>;
}
