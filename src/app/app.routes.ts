import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listProducts', // Nombre de la ruta destino
    pathMatch: 'full'        // Obligatorio para rutas vacías
  },
  {
    path: 'listProducts',
    loadComponent: () => import('./ui/pages/products-list/products-list').then(m => m.ProductsList)
  },
  {
    path: 'productsCreate',
    loadComponent: () => import('./ui/pages/products-create/products-create').then(m => m.ProductsCreate)
  },
];
