import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {
  products: any[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.service.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;  // Assign the API response to the products array
        console.log(this.products);  // To ensure data is arriving
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
