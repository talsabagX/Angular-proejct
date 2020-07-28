import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemService } from 'src/app/services/cartItem.service';
import { ProductsService } from 'src/app/services/productService';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent implements OnInit {
  public byName: string
  public productInformationToAdd: CartItem
  public optionAmountArray: number[]
  public products: Product[];
  public showProduct: Product
  constructor(private productService: ProductsService, private cartItemService: CartItemService) {
    this.byName = ""
    this.products = []
    this.productInformationToAdd = new CartItem(0, 1)
    this.showProduct = {
      product_name: "",
      category_id: 0,
      price: 0,
      path: "",
      id: 0,
      name: "",
    }
    this.optionAmountArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  ngOnInit() {

    let observable = this.productService.getAllProducts();
    observable.subscribe(productsList => {

      this.products = productsList;

      // console.error(this.coupons);
    }, error => {
      console.log('Failed to get coupons ' + JSON.stringify(error));
    });
  }

  public initShowProduct(currentProduct: Product) {
    this.showProduct = currentProduct
  }

  public addCartItem(currentProduct: Product) {
    console.log(this.productInformationToAdd.amount)
    console.log(this.productInformationToAdd);
    
    console.log(currentProduct)

    this.productInformationToAdd.productId = currentProduct.id



    let observable = this.cartItemService.addCartItem(this.productInformationToAdd);
    observable.subscribe(itemList => {
      
    }, error => {
      console.log('Failed to get product' + JSON.stringify(error));
    });

  }

}
