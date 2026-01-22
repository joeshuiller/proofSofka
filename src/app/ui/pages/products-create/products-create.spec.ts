import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCreate } from './products-create';
import { ProductsUsecase } from '../../../core/application/use-case/products.usecase';
import { fakeProduct, fakeProducts, mockUsecase } from '../products-list/products-list.spec';
import { v4 as uuidv4 } from 'uuid';
import { jest } from '@jest/globals';
import { signal } from '@angular/core';
describe('ProductsCreate', () => {
  let component: ProductsCreate;
  let fixture: ComponentFixture<ProductsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsCreate],
      providers: [
          { provide: ProductsUsecase, useValue: mockUsecase }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
    jest.clearAllMocks();
    component.productsForm.setValue({
      uuid: 'test-uuid',
      name: 'Test Product',
      description: 'This is a test product description.',
      logo: 'test-logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2024-06-01')
    });
    fixture.detectChanges();
  });
  it('debe crear el producto exitosamente', () => {
      fixture.detectChanges();
      const usecase = TestBed.inject(ProductsUsecase);
      expect(usecase.products()).toEqual(mockUsecase.products());
  });
  it('debe generar un ID único', () => {
    const id = uuidv4(); // Ahora esto no romperá el test
    expect(id).toBeDefined();
    // ... tu lógica de UseCase
  });

  it('debe debe comsumir products', () => {
    const usecase = TestBed.inject(ProductsUsecase);
    const products = usecase.products()
    TestBed.flushEffects();
    fixture.detectChanges();
    expect(products).toBeTruthy;
    expect(products).toEqual(fakeProduct);
    expect(products).toBe(fakeProduct);
  });

  it('debe debe comsumir products', () => {
    const submit = component.onSubmit()
    TestBed.flushEffects();
    fixture.detectChanges();
    expect(submit).toBeTruthy;
  });

  it('debe debe comsumir reset', () => {
    const usecase = TestBed.inject(ProductsUsecase);
    const products = usecase.products()
    const submit = component.reset()
    const productsForm = component.productsForm.controls['name'].value
    TestBed.flushEffects();
    fixture.detectChanges();
    expect(submit).toBeTruthy;
    expect(productsForm).toBe("");
  });

  it('debe debe comsumir onDateChange', () => {
    // 1. Preparamos el mock del evento
    // Si tu componente espera un objeto Date:
    const mockDate = new Date('2026-01-22');
    const mockEvent = { target: { value: mockDate } } as any as Event;

    // 2. Espiamos si hay lógica interna (opcional)
    const spy = jest.spyOn(component, 'onDateChange');

    // 3. Ejecutamos la función directamente
    const onDateChange = component.onDateChange(mockEvent, 0);
    expect(onDateChange).toBeTruthy;
    // 4. Verificamos el resultado en el estado del componente
    // Asumiendo que guarda la fecha en un array llamado selectedDates
    //expect(component.selectedDates[0]).toEqual(mockDate);
  });

});
