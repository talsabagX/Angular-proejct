import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("/api/products/");
  }

  public getCountAllProducts(): Observable<number> {
    return this.http.get<number>("/api/products/amountOfProducts");
  }

  public addProduct(product: Product): Observable<any> {
    return this.http.post<any>("/api/products", product)
  }

  public updateProduct(product: Product): Observable<any> {
    return this.http.put<any>("/api/products", product)
  }
}
