import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Cart } from '../models/cart';


@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) {

   }

  public addCart(cartId): Observable<Cart> {
        return this.http.post<Cart>("/api/cart/",cartId)
      }
  }

