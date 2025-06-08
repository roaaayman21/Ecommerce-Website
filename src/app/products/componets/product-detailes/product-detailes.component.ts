import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartsService } from '../../../carts/services/carts.service';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  isNew?: boolean;
  discount?: number;
}

@Component({
  selector: 'app-product-detailes',
  templateUrl: './product-detailes.component.html',
  styleUrls: ['./product-detailes.component.scss']
})
export class ProductDetailesComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = false;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private cartService: CartsService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getProductById(parseInt(id)).subscribe({
        next: (res: Product) => {
          this.product = {
            ...res,
            isNew: Math.random() > 0.8,
            discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0
          };
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
          console.error('Error fetching product:', error);
        }
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product);
      }
    }
  }

  incrementQuantity(): void {
    if (this.quantity < 10) this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  getFinalPrice(): number {
    if (!this.product) return 0;
    return this.product.discount ?
      this.product.price * (1 - this.product.discount / 100) :
      this.product.price;
  }
}
