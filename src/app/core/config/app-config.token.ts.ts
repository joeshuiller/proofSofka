import { InjectionToken } from "@angular/core";

export interface AppConfig {
  production: boolean;
  api: {
    baseUrl: string;
    timeout: number;
  };
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
