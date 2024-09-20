import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductComponent } from './products/componets/all-product/all-product.component';
import { ProductDetailesComponent } from './products/componets/product-detailes/product-detailes.component';
import { CartComponent } from './carts/components/cart/cart.component';

const routes: Routes = [
  {path:"product", component: AllProductComponent},
  {path:"details", component: ProductDetailesComponent},
  {path:"cart", component: CartComponent},
  {path:"**", redirectTo: "product", pathMatch: "full"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
