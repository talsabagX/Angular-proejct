import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {


  constructor(private http: HttpClient) { }
  public sumTotalOrder: number
  private refreshNeeded = new Subject<void>()

 get onRefreshNeeded() {
    return this.refreshNeeded
  }

  public getAllCartItems(): Observable<CartItem[]> {

    return this.http.get<CartItem[]>("/api/cartItem/getAll");
  }

  public deleteCartItem(id:number): Observable<any> {
    return this.http.delete<any>("/api/cartItem/" + id)
  }

  public addCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post("/api/cartItem/", cartItem)
      .pipe(
        tap(() => {
          this.refreshNeeded.next()
        })

      )

  }

  public getTotalOrderSum(): Observable<any> {
    return this.http.get("/api/cartItem/totalOrderSum")
  }

  public deleteAllCartItems(id: number): Observable<any> {
    return this.http.delete<any>("/api/cartItem/deleteAllItems/" + id)
  }

}
