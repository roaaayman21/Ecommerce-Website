import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './products/componets/all-product/all-product.component';
import { ProductDetailesComponent } from './products/componets/product-detailes/product-detailes.component';
import { CartComponent } from './carts/components/cart/cart.component';
import { CheckoutComponent } from './carts/components/checkout/checkout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"products", component: AllProductComponent},
  {path:"products/:id", component: ProductDetailesComponent},
  {path:"cart", component: CartComponent},
  {path:"checkout", component: CheckoutComponent},
  {path:"", redirectTo: "home", pathMatch: "full"},
  {path:"**", redirectTo: "home", pathMatch: "full"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
