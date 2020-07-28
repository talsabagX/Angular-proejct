import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public productsByCategory: Product[]

  constructor(private http: HttpClient) { }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("/api/categories/");
  }

  public getAllProductsCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>("/api/categories/" + id);
  }

}
