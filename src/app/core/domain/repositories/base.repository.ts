import { Observable } from "rxjs";

export interface IBaseRepository<T> {
  getAll(): Observable<T[]>;
  getById(id: string | number): Observable<T>;
  create(item: T): Observable<T>;
  update(id: string | number, item: T): Observable<T>;
  delete(id: string | number): Observable<T>;
}
