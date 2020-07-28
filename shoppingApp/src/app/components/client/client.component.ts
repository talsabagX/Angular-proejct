import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { CartItemService } from 'src/app/services/cartItem.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart';
import { SuccessfulLoginServerResponse } from 'src/app/models/SuccessfulLoginServerResponse';
import { UserRegistration } from 'src/app/models/UserRegistration';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public cartId: number
  public name: string
  public date: string
  public isUserHaveAnOpanCart: boolean
  public isUserHaveOrder: boolean
  public cart:Cart
  public user:SuccessfulLoginServerResponse
  public userFirstName : string
  public userLastName : string
  constructor(private orderService: OrdersService, private cartItemService: CartItemService, public usersService: UserService , public cartService:CartService) {

    }
  ngOnInit() {
    this.userFirstName = this.usersService.userFirstName
    this.userLastName = this.usersService.userLastName
    this.isUserHaveAnOpanCart = false
    this.isUserHaveOrder = false
    this.getUserOpenCartId()
    this.getOrder()
    
  }

  private getOrder() {
    let observable = this.orderService.getOrdersByUserId();
    observable.subscribe(data => {
      if (data.length != 0) {
        this.isUserHaveOrder = true
      }
    }, error => {
      console.log('Failed to get order ' + JSON.stringify(error));
    });
  }

  private getUserOpenCartId() {
    let observable = this.orderService.getUserOpenCartId();
    observable.subscribe(data => {
      if (data.length != 0) {
        this.isUserHaveAnOpanCart= true
        alert("The cart from before has been saved for your comfort")


      }

     
    }, error => {
      console.log('Failed to get order ' + JSON.stringify(error));
    });
  }

  



public addCartToUser(){
   let observable = this.cartService.addCart(this.cartId)
   
   observable.subscribe(data=>{
   },error =>{
     console.log(error);
     
   })

 
}

}

