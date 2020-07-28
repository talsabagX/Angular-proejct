import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { productService } from 'src/app/services/productService';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public products:Product[];
    constructor(private productService: productService) {
       this.productService=productService
     
      }
    
    ngOnInit(): void {
        const productObservable = this.productService.getAllProducts();
        productObservable.subscribe(productList => {
          this.products = productList;
        }, serverErrorResponse => {
          alert("error! status: " + serverErrorResponse.status + " ,message " + serverErrorResponse.message);
        });
      }
    }

//     public products: Product[];
//     public isShowAllProducts: boolean;

//     //   constructor(private userService:UserService) { }
//     constructor(private productService: productService) {
//         this.products = [];
//     }

//     ngOnInit() {
//         this.isShowAllProducts = true;
//         console.log("Step1")
//         let observable = this.productService.getAllProducts();
//         observable.subscribe(productList => {
//             this.products = productList;
//            console.log(productList)
//         }, error => {
//             alert('Failed to get coupons ' + JSON.stringify(error));
//         });
//         // this.userService.createUser(new UserLoginDetails("avi", "1234")).subscribe(successfulServerRequestData => {
//         //     console.log(successfulServerRequestData);                                        
//         // }, serverErrorResponse => {                     
//         //     alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
//         // }); 
//     }

//     public showProduct(product: Product) {
//         // Debugging using printing the object value in the browser's console
//         console.log(product);
//         this.isShowAllProducts = false;
//     }

//     public showCoupons() {
//         this.isShowAllProducts = true;
//     }

//     public purchaseCoupon() { }
// }
