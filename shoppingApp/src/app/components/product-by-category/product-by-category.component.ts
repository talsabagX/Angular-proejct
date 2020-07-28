import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { CartItemService } from 'src/app/services/cartItem.service';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})
export class ProductByCategoryComponent implements OnInit {
  public byName: string
  public productInformationToAdd: CartItem
  public optionAmountArray: number[]
  public productsByCategory: Product[];
  public showProduct: Product
  public categoryName: string
  constructor(private categortService: CategoriesService, private activeRoute: ActivatedRoute, private cartItemService: CartItemService) {
    this.byName = ""
    this.productsByCategory= [];
    this.productInformationToAdd = new CartItem(0, 1)
    this.categoryName = ""
    this.showProduct = {
      product_name:"",
      price: 0,
      category_id: 0,
      path: "",
      id: 0,
      name:"",
    }
    this.optionAmountArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams => { })
    this.activeRoute.params.subscribe(routeParams => {
      let observable = this.categortService.getAllProductsCategory(routeParams.id);
      observable.subscribe(productsByCategoriesList => {
        this.productsByCategory = productsByCategoriesList
        console.log(productsByCategoriesList)

        this.categoryName = productsByCategoriesList[0].name

      }, error => {
        alert('Failed to get categories ' + JSON.stringify(error));
      });
    });


  }
  public initShowProduct(currentProduct: Product) {
    this.showProduct = currentProduct
    console.log(this.showProduct)
  }

  public addCartItem(currentProduct: Product) {
    console.log(this.productInformationToAdd.amount)
    console.log(currentProduct)

    this.productInformationToAdd.productId = currentProduct.id



    let observable = this.cartItemService.addCartItem(this.productInformationToAdd);
    observable.subscribe(itemList => {
// console.log(itemList)
    }, error => {
      alert('Failed to get cartItem' + JSON.stringify(error));
    });

  }

}


