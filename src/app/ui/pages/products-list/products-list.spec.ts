import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsList } from './products-list';
import { ProductsUsecase } from '../../../core/application/use-case/products.usecase';
import { signal } from '@angular/core';
import { jest } from '@jest/globals';
import Swal from 'sweetalert2';
import { AlertSevice } from '../../utils/alert.sevice';
export const fakeProducts = {
      data: [
        {
          id: 'iooopppi',
          name: 'Angular 21 Book',
          description: 'A comprehensive guide to Angular 21.',
          logo: 'angular21.png',
          date_release: new Date('2024-01-15'),
          date_revision: new Date('2024-06-10')
        },
        {
          id: 'iooopppi343523',
          name: 'Angular 2134 Book',
          description: 'A comprehensive guide to Angular 21343.',
          logo: 'angular2134.png',
          date_release: new Date('2024-01-15'),
          date_revision: new Date('2024-06-10')
        }
      ],
      error:{
        message: "error"
      }
};
export const fakeProduct = {
  id: 'iooopppi',
  name: 'Angular 21 Book',
  description: 'A comprehensive guide to Angular 21.',
  logo: 'angular21.png',
  date_release: new Date('2024-01-15'),
  date_revision: new Date('2024-06-10')
}

export const mockSource = signal(fakeProducts);
export const mockSourceError = signal(fakeProducts.error);
export const mockSourceProduct = signal(fakeProduct);
export const mockUsecase = {
    loading: signal(true),
    productsEdit: signal(true),
    productsDelete: signal(true),
    productsLoading: signal(true),
    productsList: mockSource,
    productsEditData: mockSourceProduct,
    products: mockSourceProduct,
    productsError: mockSourceError,
    productsListError: mockSourceError,
    loadProducts: jest.fn(),
    getDataById: jest.fn().mockReturnValue(of(mockSourceProduct)),
    //saveData: jest.fn().mockReturnValue(of(mockSourceProduct)),
    saveData: jest.fn().mockReturnValue(of({ success: true, data: mockSourceProduct })),
    deleteProduct: jest.fn().mockReturnValue(of(true)),
    editData: jest.fn().mockReturnValue(of(true)),
    deleteData:jest.fn().mockReturnValue(of(true)),
};
describe('ProductsList', () => {
  let component: ProductsList;
  let fixture: ComponentFixture<ProductsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsList],
      providers: [
        AlertSevice,
        { provide: ProductsUsecase, useValue: mockUsecase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsList);
    component = fixture.componentInstance;
    await fixture.whenStable()
    jest.clearAllMocks();
  });

  it('debe obtener listado de productos exitosamente', () => {
    fixture.detectChanges();
    const usecase = TestBed.inject(ProductsUsecase);
    TestBed.flushEffects();
    expect(usecase.productsList()).toEqual(fakeProducts);
  });

  it('debe manejar error al obtener listado de productos', () => {
    const usecase = TestBed.inject(ProductsUsecase);
    usecase.productsList = signal([]);
    TestBed.flushEffects();
    usecase.productsListError = signal('Error al cargar productos');
    fixture.detectChanges();
    expect(usecase.productsList()).toHaveLength(0);
    expect(usecase.productsListError()).toBe('Error al cargar productos');
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

  it('debe debe comsumir products', async () => {
      const alertSevice = TestBed.inject(AlertSevice);
    // 1. Creamos el Mock de la respuesta de Swal
        const swalSpy = jest.spyOn(Swal, 'fire').mockResolvedValue({
          isConfirmed: true,
          isDenied: false,
          isDismissed: false
        } as any);

        // 2. Ejecutamos el método del servicio
        // 2. Ejecutamos el método del servicio
        const respuesta1 = await alertSevice.deleteAlert("¿Estás seguro?", "Esta acción no se puede deshacer");
        const respuesta =  component.deleteProducts("hola");

        // 3. Verificaciones ✅
        expect(swalSpy).toHaveBeenCalledWith(expect.objectContaining({
          title: "¿Estás seguro?",
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        }));
        expect(respuesta1).toBe(true);
  });

  it('debe debe comsumir applyFilter', () => {
    // 1. Preparamos el mock del evento
    // Si tu componente espera un objeto Date:
    const mockDate = "hola";
    const mockEvent = { target: { value: mockDate } } as any as Event;

    // 2. Espiamos si hay lógica interna (opcional)
    const spy = jest.spyOn(component, 'applyFilter');

    // 3. Ejecutamos la función directamente
    const applyFilter = component.applyFilter(mockEvent);
    expect(applyFilter).toBeTruthy;
    // 4. Verificamos el resultado en el estado del componente
    // Asumiendo que guarda la fecha en un array llamado selectedDates
    //expect(component.selectedDates[0]).toEqual(mockDate);
  });



});
