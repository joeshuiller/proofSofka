import { Component, computed, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsUsecase } from '../../../core/application/use-case/products.usecase';
import { AlertSevice } from '../../utils/alert.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './products-edit.html',
  styleUrl: './products-edit.css',
})
export class ProductsEdit {
  private products = inject(ProductsUsecase);
  private alert = inject(AlertSevice);
  public id = input.required<string>();
  private upperCaseId = computed(() => this.id());
  private dateNew = new Date();
  private router = inject(Router);
  public productsForm = new FormGroup({
    uuid: new FormControl({ value: 'valor inicial', disabled: true }, { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6),
    Validators.maxLength(100)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10),
    Validators.maxLength(200)] }),
    logo: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    date_release: new FormControl(this.dateNew, { nonNullable: true, validators: [Validators.required] }),
    date_revision: new FormControl(this.dateNew, { nonNullable: true, validators: [Validators.required] })
  });
  minDate = signal(new Date().toISOString().split('T')[0]);
  minDateEnd = signal(new Date().toISOString().split('T')[0]);
  public formValue = signal(this.productsForm.getRawValue());
  public isFormValid = signal(false);
  public loadingValid = signal(false);
  constructor() {
    this.products.products();
    effect(() => {
      this.editSave();
      this.editGet();
    });
  }
  ngOnInit(): void {
    // Escuchamos cambios y actualizamos el Signal
    this.productsForm.valueChanges.subscribe(() => {
      this.formValue.set(this.productsForm.getRawValue());
      this.isFormValid.set(this.productsForm.valid);
    });
    this.products.getDataById(this.upperCaseId());

  }
  editSave(){
    const loading = this.products.productsEdit();
    if (!loading) {
      const dataList = this.products.productsDelete();
      if (dataList) {
        this.reset();
        this.loadingValid.set(false);
        this.alert.successAlert('¡Éxito!', 'Producto editado exitosamente.');
        this.router.navigate(['/listProducts']);
      }
      const dataListError = this.products.productsError();
      if (dataListError) {
        this.loadingValid.set(false);
        this.alert.errorAlert('¡Error!', 'Error al crear el producto.');
      }
    }
  }
  editGet(){
    const loading = this.products.loading();
    if (!loading) {
      const dataList = this.products.productsEditData();
      if (dataList) {
        this.productsForm.setValue({
          uuid: dataList.id,
          name: dataList.name,
          description: dataList.description,
          logo: dataList.logo,
          date_release: dataList.date_release,
          date_revision: dataList.date_revision
        });
      }
    }
  }
  onSubmit() {
    if (this.productsForm.valid) {
      this.loadingValid.set(true);
      this.products.editData(this.upperCaseId(), this.formValue());
    }
  }
  reset(){
    this.router.navigate(['/listProducts']);
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
