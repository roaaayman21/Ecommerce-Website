import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductComponent } from './componets/all-product/all-product.component';
import { ProductDetailesComponent } from './componets/product-detailes/product-detailes.component';



@NgModule({
  declarations: [
    AllProductComponent,
    ProductDetailesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
