import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AlertSevice {
  public isFormValid = signal(false);
  successAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
  errorAlert(title: string, text: string): void {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
  deleteAlert(title: string, text: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result):boolean => {
      this.isFormValid.set(result.isConfirmed);
      return this.isFormValid();
    });
  }
}
