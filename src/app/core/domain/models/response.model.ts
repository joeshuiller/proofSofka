import { ProductModel } from "./product.model";

export interface ResponseModel {
  data: ProductModel[];
}

export interface Response {
  data: ProductModel;
}

export interface ResponseBoolean {
  data: boolean;
}
