import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { ProductsDto } from '../../infrastructure/dtos/products.dto';
import { ProductModel } from '../../domain/models/product.model';
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IProductsRepository } from '../../domain/repositories/products.repository';
import { ProductsEdit } from '../../../ui/pages/products-edit/products-edit';

@Injectable({
  providedIn: 'root',
})
export class ProductsUsecase {
  private readonly _repository = inject(IProductsRepository);
  private productsState$ = this._repository.getData().pipe(
    map(response => ({ data: response.data, error: null })),
    catchError(err => of({ data: [], error: err.message || 'No se pudieron cargar los productos ❌' })),
  );
  #productsList = toSignal(this.productsState$, {
    initialValue: { data: [], error: null }
  });
  #products = signal<ProductModel | null>(null);
  #productsEditData = signal<ProductModel | null>(null);
  #productsError = signal(null);
  #productsDelete = signal<boolean>(false);
  #productsEdit = signal<boolean>(false);
  #loading = signal<boolean>(false);
  public productsDelete = this.#productsDelete.asReadonly();
  public productsEdit = this.#productsEdit.asReadonly();
  public productsEditData = this.#productsEditData.asReadonly();
  public loading = this.#loading.asReadonly();
  public products = this.#products.asReadonly();
  public productsError = this.#productsError.asReadonly();
  public productsLoading = this.#loading.asReadonly();
  public productsList = linkedSignal(() => this.#productsList()?.data);
  public productsListError = linkedSignal(() => this.#productsList()?.error);


  async getDataById(id: string): Promise<void>{
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.getDataById(id));
      this.#productsEditData.set(data as unknown as ProductModel);
      this.#loading.set(false);
    } catch(error: any){
      this.#productsError.set(error.message || 'Error crear el producto');
    } finally {
      this.#loading.set(false);
    }
  }

  async saveData(product: ProductsDto): Promise<void>{
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.saveData(product));
      this.#products.set(data.data as ProductModel);
      this.#loading.set(false);
    } catch(error: any){
      this.#productsError.set(error.message || 'Error crear el producto');
    } finally {
      this.#loading.set(false);
    }
  }

  async deleteData(id: string): Promise<void>{
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.deleteData(id));
      this.#productsDelete.set(data);
      this.#loading.set(false);
    } catch(error: any){
      this.#productsError.set(error.message || 'Error crear el producto');
    } finally {
      this.#loading.set(false);
    }
  }

  async editData(id: string, product: ProductsDto): Promise<void>{
    this.#loading.set(true);
    try {
      const data = await firstValueFrom(this._repository.editData(id, product));
      this.#productsEdit.set(data);
      this.#loading.set(false);
    } catch(error){
      console.error('Error fetching product by ID:', error);
    } finally {
      this.#loading.set(false);
    }
  }
}
