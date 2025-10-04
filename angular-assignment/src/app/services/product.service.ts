import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'https://dummyjson.com';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>(`${this.base}/products`).pipe(map(res => res.products));
  }
}
