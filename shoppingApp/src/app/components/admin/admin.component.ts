import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/productService';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public byName: string
  public products: Product[]
  public showProduct: Product
  constructor(private productService: ProductsService) {
    
    this.byName = ""
    this.products=[]
    this.showProduct = {
      product_name: "",
      category_id: 0,
      price: 0,
      path: "",
      id: 0,
      name: "",
    }
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
      public updateProduct(){
        
    let observable = this.productService.updateProduct(this.showProduct)
    observable.subscribe(data => {


    })
      }

}
