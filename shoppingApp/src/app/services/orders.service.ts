import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetails } from '../models/orderDetails';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public getCountAllOrders(): Observable<number> {
    return this.http.get<number>("/api/orders/amountOfOrders");
  }
  public getOrdersByUserId(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>("/api/orders/all-orders")
}
 
  public getUserOpenCartId(): Observable<Cart[]> {
    return this.http.get<Cart[]>("/api/cart/openCart")
  }

  public addOrder(orderDetails: OrderDetails): Observable<any> {
    console.log(orderDetails)
    return this.http.post("/api/orders", orderDetails)
  }

 
  // public createNewOrder(orderDetails: OrderDetails): Observable<any> {
  //   console.log(orderDetails)
  //   return this.http.post("/api/orders", orderDetails)
  // }
}
