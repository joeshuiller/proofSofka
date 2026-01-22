import { uuid } from './../../../../../node_modules/zod/src/v4/core/regexes';
import { TestBed } from '@angular/core/testing';

import { ProductsRepository } from './products.repository';
import { APP_CONFIG, AppConfig } from '../../config/app-config.token.ts';
import { BaseHttpRepository } from './base-http.repository';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { fakeProduct, fakeProducts } from '../../../ui/pages/products-list/products-list.spec';

export const fakeProductResponse = {
  uuid: 'iooopppi',
  name: 'Angular 21 Book',
  description: 'A comprehensive guide to Angular 21.',
  logo: 'angular21.png',
  date_release: new Date('2024-01-15'),
  date_revision: new Date('2024-06-10')
}
describe('ProductsRepository', () => {
  let repository: ProductsRepository;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsRepository,
        provideHttpClient(),        // Cliente real
        provideHttpClientTesting(), // Interceptor de mocks
        {
          provide: APP_CONFIG,
          useValue: {
            production: false,
            api: {
              baseUrl: 'http://localhost:3000/api', // 🚨 DEBE estar dentro de 'api'
              timeout: 5000
            }
          } as AppConfig
        } // Objeto mock de tu configuración
      ]
    });
    repository = TestBed.inject(ProductsRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
      // 🚨 Garantiza que no queden peticiones colgadas que ensucien el coverage
      httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  it('should have correct apiUrl', () => {
    const url = repository['apiUrl'];
    expect(url).toBe('http://localhost:3000/api/products');
  });

  it('should have correct resourcePath', () => {
    expect(repository['resourcePath']).toBe('products');
  });

  it('should have HttpClient injected', () => {
    expect(repository['http']).toBeDefined();
  });

  it('should extend BaseHttpRepository', () => {
    expect(repository instanceof BaseHttpRepository).toBeTruthy();
  });

  it('should have all methods from BaseHttpRepository', () => {
    expect(typeof repository.getAll).toBe('function');
  });

  it('debe obtener la lista de productos (getAll)', (done) => {

    repository.getAll().subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products');
    expect(req.request.method).toBe('GET');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (getData)', (done) => {

    repository.getData().subscribe(products => {
      expect(products.data.length).toBe(2);
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products');
    expect(req.request.method).toBe('GET');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (getById)', (done) => {

    repository.getById("hola").subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products/hola');
    expect(req.request.method).toBe('GET');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (getDataById)', (done) => {

    repository.getDataById("hola").subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products/hola');
    expect(req.request.method).toBe('GET');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });


  it('debe obtener la lista de productos (saveData)', (done) => {
    repository.saveData(fakeProductResponse).subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products');
    expect(req.request.method).toBe('POST');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (create)', (done) => {
    repository.create(fakeProduct).subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products');
    expect(req.request.method).toBe('POST');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (update)', (done) => {

    repository.update("hola", fakeProduct).subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products/hola');
    expect(req.request.method).toBe('PUT');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (delete)', (done) => {

    repository.delete("hola").subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products/hola');
    expect(req.request.method).toBe('DELETE');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (editData)', (done) => {

    repository.editData("hola", fakeProductResponse).subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products/hola');
    expect(req.request.method).toBe('PUT');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });

  it('debe obtener la lista de productos (deleteData)', (done) => {

    repository.deleteData("hola").subscribe(products => {
      expect(products).toEqual(fakeProducts);
      done(); // Importante para tests asíncronos
    });

    // Intercepta la llamada a la URL específica
    const req = httpMock.expectOne('http://localhost:3000/api/products/hola');
    expect(req.request.method).toBe('DELETE');

    // Responde con los datos falsos
    req.flush(fakeProducts);
  });
});
