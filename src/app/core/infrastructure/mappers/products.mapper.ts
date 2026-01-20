import { ProductModel } from "../../domain/models/product.model";
import { ProductsDto } from "../dtos/products.dto";
import { UiMapper } from "./ui.mapper";

export class ProductsMapper implements UiMapper<ProductModel, ProductsDto> {
  mapToUi(model: ProductModel): ProductsDto {
    return {
      uuid: model.id,
      name: model.name,
      description: model.description,
      logo: model.logo,
      date_release: model.date_release,
      date_revision: model.date_revision
    };
  }

  mapFromUi(ui: ProductsDto): ProductModel {
    return {
      id: ui.uuid,
      name: ui.name,
      description: ui.description,
      logo: ui.logo,
      date_release: ui.date_release,
      date_revision: ui.date_revision
    };
  }
}
