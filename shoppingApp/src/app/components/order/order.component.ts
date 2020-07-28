import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemService } from 'src/app/services/cartItem.service';
import { OrderDetails } from 'src/app/models/orderDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {

  public query: string
  public totalAmountToPay: number
  public orederSum: number
  public cartItem: CartItem[];
  public isShowFields: boolean
  public orderDetaiels: OrderDetails
  constructor(public cartItemService: CartItemService, private orderService: OrdersService ,private router:Router) {
    this.cartItem = []
    // this.content = this.cartItem[].product_name
    this.orderDetaiels = new OrderDetails(0,0,"","","",0);

  }

  public highlight(index: number) {
    if (!this.query) {
      return this.cartItem[index].productName
    }
    return this.cartItem[index].productName.replace(new RegExp(this.query, ""), match => {
      return '<span class="highlightText">' + match + '</span>';

    })
  }

  ngOnInit(): void {
    this.isShowFields = false
    this.totalAmountToPay = this.cartItemService.sumTotalOrder    
  this.orderDetaiels.total_price =this.cartItemService.sumTotalOrder    
    let observable = this.cartItemService.getAllCartItems();
    observable.subscribe(itemList => {
      this.cartItem = itemList;

      // console.error(this.coupons);
    }, error => {
      console.log('Failed to get categories ' + JSON.stringify(error));
    });
  }

  public onCheck(isChecked: boolean) {
    if (isChecked) {
      this.isShowFields = true
    } else {
      this.isShowFields = false
    }

  }


  public addOrder() {
    console.log(this.totalAmountToPay);
    
    let observable = this.orderService.addOrder(this.orderDetaiels);
    
    observable.subscribe(itemList => {
      alert("Thank you for your order")
    this.router.navigate(["./myOrders"])
      
    }, error => {
      console.log('Failed to get Orders ' + JSON.stringify(error));
    });
  }

}
