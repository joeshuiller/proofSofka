// Opción A (La más compatible con ESM):
import 'jest-preset-angular/jest-preset';

import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Solo inicializa si no ha sido inicializado antes
try {
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
} catch (e) {
  // Ya inicializado, ignorar
}
