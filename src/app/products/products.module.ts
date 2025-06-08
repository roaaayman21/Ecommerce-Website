import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AllProductComponent } from './componets/all-product/all-product.component';
import { ProductDetailesComponent } from './componets/product-detailes/product-detailes.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    AllProductComponent,
    ProductDetailesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class ProductsModule { }
