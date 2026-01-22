import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '../../config/app-config.token.ts';
import { HttpClient } from '@angular/common/http';
import { IBaseRepository } from '../../domain/repositories/base.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpRepository<T> implements IBaseRepository<T> {
  protected http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  // Cada hijo definirá su propio path (ej: 'users', 'products')
  protected abstract resourcePath: string;

  protected get apiUrl(): string {
    console.log('this.config.api.baseUrl:', this.config);
    return `${this.config.api.baseUrl}/${this.resourcePath}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item);
  }

  update(id: string | number, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: string | number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${id}`);
  }
}
