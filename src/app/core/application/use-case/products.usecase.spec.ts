import { TestBed } from '@angular/core/testing';

import { ProductsUsecase } from './products.usecase';
import { of } from 'rxjs';
import { fakeProduct, fakeProducts, mockSource, mockSourceError, mockSourceProduct } from '../../../ui/pages/products-list/products-list.spec';
import { IProductsRepository } from '../../domain/repositories/products.repository';
import { jest } from '@jest/globals';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
export const mockRepository = {
    getDataById: jest.fn(),
    getData: jest.fn(),
    saveData: jest.fn(),
    deleteData: jest.fn(),
    editData: jest.fn(),
};

describe('ProductsUsecase', () => {
  let usecase: ProductsUsecase;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    mockRepository.getData.mockReturnValue(of(fakeProducts));
    mockRepository.getDataById.mockReturnValue(of(fakeProduct));
    mockRepository.saveData.mockReturnValue(of({ data: fakeProduct }));
    mockRepository.deleteData.mockReturnValue(of(true));
    mockRepository.editData.mockReturnValue(of(true));
    TestBed.configureTestingModule({
      providers: [
        ProductsUsecase,
        provideHttpClient(),        // Cliente real
        provideHttpClientTesting(), // Interceptor de mocks
        { provide: IProductsRepository, useValue: mockRepository }
      ]
    });
    usecase = TestBed.inject(ProductsUsecase);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones sin responder
  });
  it('debe tener los productos disponibles en el Signal inmediatamente', () => {
    // 💡 Al ser un Signal, accedemos como función: products()
    const result = usecase.productsList();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Angular 21 Book');
    expect(mockRepository.getData).toHaveBeenCalledTimes(1);
  });

  it('debe obtener un producto por ID', async () => {
    await usecase.getDataById('iooopppi');
    const result = usecase.productsEditData();
    expect(result).toEqual(fakeProduct);
    expect(mockRepository.getDataById).toHaveBeenCalledWith('iooopppi');
  });

  it('debe guardar un producto', async () => {
    const dataEnd = await usecase.saveData({
      uuid: 'iooopppi',
      name: 'Angular 21 Book',
      description: 'A comprehensive guide to Angular 21.',
      logo: 'angular21.png',
      date_release: new Date('2024-01-15'),
      date_revision: new Date('2024-06-10')
    });
    const result = usecase.products();
    expect(result).toEqual(fakeProduct);
    expect(mockRepository.saveData).toHaveBeenCalled();
  });

  it('debe eliminar un producto por ID', async () => {
    await usecase.deleteData('iooopppi');
    const result = usecase.productsDelete();
    expect(result).toBe(true);
    expect(mockRepository.deleteData).toHaveBeenCalledWith('iooopppi');
  });

  it('debe editar un producto por ID', async () => {
    await usecase.editData('iooopppi', {
      uuid: 'iooopppi',
      name: 'Angular 21 Book Edited',
      description: 'A comprehensive guide to Angular 21 - Edited.',
      logo: 'angular21_edited.png',
      date_release: new Date('2024-01-20'),
      date_revision: new Date('2024-06-15')
    });
    const result = usecase.productsEdit();
    expect(result).toBe(true);
    expect(mockRepository.editData).toHaveBeenCalledWith('iooopppi', expect.objectContaining({
      name: 'Angular 21 Book Edited'
    }));
  });


});
