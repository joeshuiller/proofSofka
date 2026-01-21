import { AfterViewInit, Component, effect, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { ProductsUsecase } from '../../../core/application/use-case/products.usecase';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductModel } from '../../../core/domain/models/product.model';
import { Router } from '@angular/router';
import { AlertSevice } from '../../utils/alert.sevice';

@Component({
  selector: 'app-products-list',
  imports: [MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  private products= inject(ProductsUsecase);
  private alert = inject(AlertSevice);
  displayedColumns = ['id', 'name', 'description', 'logo', 'date_release', 'date_revision', 'accion'];
  dataSource = new MatTableDataSource<ProductModel>([]);
  private router = inject(Router);
  paginator = viewChild<MatPaginator>('paginator');
  public page: number = 1;
  public pageSizes:number[] = [5,10, 20];
  public pageOptions: number = 0;
  constructor() {
    effect(() => {
      const loading = this.products.loading();
      if (!loading) {
        const dataList = this.products.productsList();
        if (dataList) {
          console.log('dataList:', dataList.length);
          this.dataSource.data = dataList;

        }
        const deleteValid = this.products.productsDelete();
        if (deleteValid) {
          this.alert.successAlert('¡Éxito!', 'Producto eliminado exitosamente.');
          this.dataSource.data = [];
          this.dataSource.data = this.products.productsList();
        }
      }
      const p = this.paginator();
      if (p) {
        this.dataSource.paginator = p;
      }
    });
  }

  ngOnInit(): void {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  routerLink(){
    this.router.navigate(['/productsCreate']);
  }
  editProducts(id: string){
    this.router.navigate(['/productsEdit', id]);
  }

  deleteProducts(id: string){
    const dataValid = this.alert.deleteAlert('¿Estás seguro?', 'Esta acción no se puede deshacer');
    dataValid.then((dataValid) => {
      if(dataValid){
        console.log('dataValid', dataValid);
        this.products.deleteData(id);
      } else {
        console.log('dataValid', dataValid);
      }
    });

  }
}
