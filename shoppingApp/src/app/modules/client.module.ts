import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { ProductByCategoryComponent } from '../components/product-by-category/product-by-category.component';
import { ShoppingComponent } from '../components/shopping/shopping.component';


const routes: Routes = [
  {
    path: "shopping", component: ShoppingComponent, children: [


      { path: '', redirectTo: 'allproducts', pathMatch: 'full' },

      { path: 'allproducts', component: ProductsComponent },
      { path: "categories/:id", component: ProductByCategoryComponent }

    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
