import { TestBed } from '@angular/core/testing';
import { AlertSevice } from './alert.sevice';
import Swal from 'sweetalert2';
import { jest } from '@jest/globals';
describe('AlertSevice', () => {
  let service: AlertSevice;

  beforeEach(() => {
    //TestBed.initTestEnvironment();
    TestBed.configureTestingModule({
      providers: [AlertSevice]
    });
    service = TestBed.inject(AlertSevice);
    jest.clearAllMocks();

  });
  it('debe retornar true cuando el usuario confirma la alerta', async () => {
    // 1. Creamos el Mock de la respuesta de Swal
    const swalSpy = jest.spyOn(Swal, 'fire').mockResolvedValue({
      isConfirmed: true,
      isDenied: false,
      isDismissed: false
    } as any);

    // 2. Ejecutamos el método del servicio
    const respuesta = await service.deleteAlert("", "");

    // 3. Verificaciones ✅
    expect(swalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: "",
      text: "",
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }));
    expect(respuesta).toBe(true);
  });
  it('debe retornar false cuando el usuario cancela la alerta', async () => {
    // 1. Creamos el Mock de la respuesta de Swal
    const swalSpy = jest.spyOn(Swal, 'fire').mockResolvedValue({
      isConfirmed: false,
      isDenied: false,
      isDismissed: true
    } as any);

    // 2. Ejecutamos el método del servicio
    const respuesta = await service.deleteAlert("", "");

    // 3. Verificaciones ✅
    expect(swalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: "",
      text: "",
      icon: 'warning',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }));
    expect(respuesta).toBe(false);
  });
  it('debe mostrar una alerta de éxito', () => {
    const swalSpy = jest.spyOn(Swal, 'fire').mockResolvedValue({} as any);

    service.successAlert("Título Éxito", "Mensaje de éxito");

    expect(swalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: "Título Éxito",
      text: "Mensaje de éxito",
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }));
  });
  it('debe mostrar una alerta de error', () => {
    const swalSpy = jest.spyOn(Swal, 'fire').mockResolvedValue({} as any);

    service.errorAlert("Título Error", "Mensaje de error");

    expect(swalSpy).toHaveBeenCalledWith(expect.objectContaining({
      title: "Título Error",
      text: "Mensaje de error",
      icon: 'error',
      confirmButtonText: 'Aceptar'
    }));
  });
});
