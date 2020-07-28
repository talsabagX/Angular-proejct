import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';
import { ClientComponent } from '../components/client/client.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductByCategoryComponent } from '../components/product-by-category/product-by-category.component';
import { ClientModule } from './client.module';
import { OrderComponent } from '../components/order/order.component';
import { AdminComponent } from '../components/admin/admin.component';
import { LoginComponent } from '../components/login/login.component';
import { DoneOrdersComponent } from '../components/done-orders/done-orders.component';



const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "client", component: ClientComponent },
  { path: "admin", component: AdminComponent },
  { path: "shopping", loadChildren:"./client.module#ClientModule" },
  { path: "myOrders" , component:DoneOrdersComponent },
  { path: "register", component: RegisterComponent },
  { path: "order", component: OrderComponent },

];

@NgModule({
  imports: [ClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
