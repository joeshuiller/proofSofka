import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ProductsUsecase } from '../../../core/application/use-case/products.usecase';
import Swal from 'sweetalert2';
import { AlertSevice } from '../../utils/alert.sevice';
@Component({
  selector: 'app-products-create',
  imports: [ReactiveFormsModule],
  templateUrl: './products-create.html',
  styleUrl: './products-create.css',
})
export class ProductsCreate implements OnInit {
  private products = inject(ProductsUsecase);
  private alert = inject(AlertSevice);
  public dateNew = new Date();
  public productsForm = new FormGroup({
    uuid: new FormControl(uuidv4(), { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6),
    Validators.maxLength(100)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10),
    Validators.maxLength(200)] }),
    logo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date_release: new FormControl(this.dateNew, { nonNullable: true, validators: [Validators.required] }),
    date_revision: new FormControl(this.dateNew, { nonNullable: true, validators: [Validators.required] })
  });
  public formValue = signal(this.productsForm.getRawValue());
  public isFormValid = signal(false);
  public loadingValid = signal(false);
  minDate = signal(new Date().toISOString().split('T')[0]);
  minDateEnd = signal(new Date().toISOString().split('T')[0]);
  constructor() {
    this.products.products();
    effect(() => {
      const loading = this.products.productsLoading();
      console.log(loading)
      if (!loading) {
        const dataList = this.products.products();
        if (dataList) {
          console.log('Fecha actual:', this.products.products());
          this.reset();
          this.loadingValid.set(false);
          this.alert.successAlert('¡Éxito!', 'Producto creado exitosamente.');
        }
        const dataListError = this.products.productsError();
        if (dataListError) {
          this.loadingValid.set(false);
          this.alert.errorAlert('¡Error!', 'Error al crear el producto.');
        }
      }
    });
  }
  ngOnInit(): void {
    // Escuchamos cambios y actualizamos el Signal
    this.productsForm.valueChanges.subscribe(() => {
      this.formValue.set(this.productsForm.getRawValue());
      this.isFormValid.set(this.productsForm.valid);
    });
  }

  onSubmit() {
    if (this.productsForm.valid) {
      this.loadingValid.set(true);
      this.products.saveData(this.formValue());
    }
  }
  reset(){
    this.productsForm.setValue({
      uuid: uuidv4(),
      name: '',
      description: '',
      logo: '',
      date_release: this.dateNew,
      date_revision: this.dateNew
    });
  }

  onDateChange(event: Event, type:number) {
    const element = event.target as HTMLInputElement;
    console.log('Nueva fecha seleccionada:', element.value, type);
    const date = new Date(element.value);
    if(type === 0){
      date.setFullYear(date.getFullYear() + 1);
      date.toISOString().split('T')[0];
      console.log('Nueva fecha seleccionada:', date);
      this.minDateEnd.set(date.toISOString().split('T')[0]);
      this.productsForm.controls['date_revision'].setValue(date);
    }
  }

}
