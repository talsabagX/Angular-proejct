import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/productService';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  private categortService: CategoriesService
  public productForm: Product
  public category: Category[];
  constructor(categortService: CategoriesService , private productService: ProductsService) { 
    this.category = []
    this.categortService = categortService
  }

  ngOnInit() {
    
    this.productForm = new Product("", 0, 0, "")
    let observable = this.categortService.getAllCategories();
    observable.subscribe(categoriesList => {
      this.category = categoriesList;
      // console.error(this.coupons);
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  
  }


  public addProduct(){
        
    let observable = this.productService.addProduct(this.productForm)
    observable.subscribe(data => {

     alert("Product has been added")

    })
      }
}
