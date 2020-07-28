import { Component, OnInit } from '@angular/core';
import { CartItemService } from 'src/app/services/cartItem.service';
import { CartItem } from 'src/app/models/cartItem';
import { Cart } from 'src/app/models/cart';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],


})
export class CartComponent implements OnInit {
  public isShowCartView: boolean
  public totalAmountToPay: any
  public cartItemService: CartItemService
public cart :Cart
  public cartItem: CartItem[];
  constructor(cartItemService: CartItemService) {
    this.cartItem = []
    this.totalAmountToPay = 0
    this.cartItemService = cartItemService
  }



  ngOnInit() {
    this.totalAmountToPay=0;
    this.isShowCartView = true
    this.cartItemService.onRefreshNeeded.subscribe(
      () => {
        this.getAllCartItems()
  
      }
    )
    this.getAllCartItems()

  }

  public getAllCartItems() {
      let observable = this.cartItemService.getAllCartItems();
      observable.subscribe(itemList => {
      this.cartItem = itemList;
      this.getTotalOrderSum()

      // console.error(this.coupons);
    }, error => {
      console.log('blah blah ' + JSON.stringify(error));
    });

  }





  public deleteCartItem(itemId: number, id: number) {
    this.cartItem.splice(itemId, 1)
    let observable = this.cartItemService.deleteCartItem(id);
    observable.subscribe(itemList => {

      this.cartItem = itemList;


    }, error => {
      console.log('Failed todelete item ' + JSON.stringify(error));
    });
    this.getTotalOrderSum()
  }

  public deleteAllCartItems() {
    let id = this.cartItem[0].cart_id;
    let observable = this.cartItemService.deleteAllCartItems(id);

      observable.subscribe(data => {
      
      this.totalAmountToPay = 0
      this.cartItemService.onRefreshNeeded.subscribe(
        () => {
          this.getAllCartItems()
    
        }
      )
      this.getAllCartItems()
    }, error => {
      console.log('Failed to clear cart ' + JSON.stringify(error));
    });
  }

  public getTotalOrderSum() {
    let observable = this.cartItemService.getTotalOrderSum();
    observable.subscribe(data => {
      this.totalAmountToPay = data
      this.cartItemService.sumTotalOrder = this.totalAmountToPay
    }, error => {
      console.log('Failed to clear cart ' + JSON.stringify(error));
    });
  }


}




