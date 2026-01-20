import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';
import { APP_CONFIG } from './core/config/app-config.token.ts';
import { ProductsRepository } from './core/infrastructure/repositories/products.repository';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: APP_CONFIG, useValue: environment },
    { provide: 'ProductsRepository', useClass: ProductsRepository },
    provideHttpClient(withFetch()),
  ]
};
