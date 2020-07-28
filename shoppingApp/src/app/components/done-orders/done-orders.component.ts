import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/models/orderDetails';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-done-orders',
  templateUrl: './done-orders.component.html',
  styleUrls: ['./done-orders.component.css']
})
export class DoneOrdersComponent implements OnInit {
  public orders: OrderDetails[];
  public showOrder: OrderDetails
  constructor(private orderService:OrdersService) { 
    this.orders = []

  }

  ngOnInit(): void {
    let observable = this.orderService.getOrdersByUserId();
    observable.subscribe(ordersList => {

      this.orders = ordersList;

      // console.error(this.coupons);
    }, error => {
      console.log('Failed to get coupons ' + JSON.stringify(error));
    });
  }
  }


