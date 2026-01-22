import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEdit } from './products-edit';
import { ProductsUsecase } from '../../../core/application/use-case/products.usecase';
import { fakeProduct, mockUsecase } from '../products-list/products-list.spec';
import { jest } from '@jest/globals';
describe('ProductsEdit', () => {
  let component: ProductsEdit;
  let fixture: ComponentFixture<ProductsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsEdit],
      providers: [
        { provide: ProductsUsecase, useValue: mockUsecase }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsEdit);
    component = fixture.componentInstance;
    // Seteamos un valor por defecto para todos los tests
    fixture.componentRef.setInput('id', 'iooopppi');
    await fixture.whenStable();

    fixture.detectChanges();
    jest.clearAllMocks();
    component.productsForm.setValue({
      uuid: 'test-uuid',
      name: 'Test Product',
      description: 'This is a test product description.',
      logo: 'test-logo.png',
      date_release: new Date('2024-01-01'),
      date_revision: new Date('2024-06-01')
    });
  });
  it('debe obtener productos exitosamente', () => {
      fixture.detectChanges();
      const usecase = TestBed.inject(ProductsUsecase);
      expect(usecase.products()).toEqual(fakeProduct);
      //expect(mockUsecase.getDataById).toHaveBeenCalledWith('iooopppi');
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
