import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './modules/routing.module';
import { AutenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from './services/user.service';
import { ProductsService } from './services/productService';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ClientComponent } from './components/client/client.component';
import { CategoryComponent } from './components/category/category.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderComponent } from './components/order/order.component';
import { ProductByCategoryComponent } from './components/product-by-category/product-by-category.component';
import { ProductsPipeByNamePipe } from './pipes/products-pipe-by-name.pipe';
import { DoneOrdersComponent } from './components/done-orders/done-orders.component';
import { AdminAddProductComponent } from './components/admin-add-product/admin-add-product.component';


@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
    ProductsComponent,
    ShoppingComponent,
    ClientComponent,
    CategoryComponent,
    CartComponent,
    AdminComponent,
    OrderComponent,
    ProductByCategoryComponent,
    ProductsPipeByNamePipe,
    DoneOrdersComponent,
    AdminAddProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RoutingModule,

  ],
  providers: [
    UserService,
    ProductsService,
    
    { provide: HTTP_INTERCEPTORS, useClass: AutenticationInterceptor, multi: true }
  ],

  bootstrap: [LayoutComponent]
})
export class AppModule { }
