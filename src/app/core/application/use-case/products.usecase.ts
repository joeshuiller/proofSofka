import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductsDto } from '../../infrastructure/dtos/products.dto';
import { ProductModel } from '../../domain/models/product.model';
import { firstValueFrom } from 'rxjs';
import { ProductsRepository } from '../../infrastructure/repositories/products.repository';

@Injectable({
  providedIn: 'root',
})
export class ProductsUsecase {
  private readonly _repository = inject(ProductsRepository);
  #productsList = signal<ProductModel[]>([]);
  #products = signal<ProductModel | null>(null);
  #productsDelete = signal<boolean>(false);
  #loading = signal<boolean>(false);
  public productsList = this.#productsList.asReadonly();
  public products = this.#products.asReadonly();
  public productsDelete = this.#productsDelete.asReadonly();
  public loading = this.#loading.asReadonly();
  public totalProducts = computed(() => this.#productsList().length);
  async getData(): Promise<void> {
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.getData());
      this.#productsList.set(data);
    } finally {
      this.#loading.set(false);
    }
  }
  async getDataById(id: string): Promise<void>{
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.getDataById(id));
      this.#products.set(data);
    } finally {
      this.#loading.set(false);
    }
  }
  async saveData(product: ProductsDto): Promise<void>{
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.saveData(product));
      this.#products.set(data);
    } finally {
      this.#loading.set(false);
    }
  }
  async deleteData(id: string): Promise<void>{
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.deleteData(id));
      this.#productsDelete.set(data);
    } finally {
      this.#loading.set(false);
    }
  }
}
