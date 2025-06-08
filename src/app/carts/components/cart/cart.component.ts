import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  shipping: number = 30;
  discount: number = 0;
  grandTotal: number = 0;
  promoCode: string = '';
  promoMessage: string = '';
  promoMessageClass: string = '';
  isCheckingOut: boolean = false;
  validPromoCodes: {[key: string]: number} = {
    'WELCOME10': 10,
    'SUMMER20': 20,
    'SALE30': 30
  };

  constructor(
    private cartService: CartsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) =>
      acc + (item.price * item.quantity), 0);
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = this.total + this.shipping - this.discount;
  }

  updateQuantity(item: any, event: any) {
    const quantity = parseInt(event.target.value);
    if (quantity > 0) {
      this.cartService.updateQuantity(item.id, quantity);
    }
  }

  incrementQuantity(item: any) {
    const newQuantity = item.quantity + 1;
    this.cartService.updateQuantity(item.id, newQuantity);
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.cartService.updateQuantity(item.id, newQuantity);
    }
  }

  deleteItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  applyPromoCode() {
    if (!this.promoCode.trim()) {
      this.promoMessage = 'Please enter a promo code';
      this.promoMessageClass = 'text-danger';
      return;
    }

    const code = this.promoCode.toUpperCase();
    if (this.validPromoCodes[code]) {
      const discountPercentage = this.validPromoCodes[code];
      this.discount = (this.total * discountPercentage) / 100;
      this.promoMessage = `${discountPercentage}% discount applied successfully!`;
      this.promoMessageClass = 'text-success';
      this.calculateGrandTotal();
    } else {
      this.promoMessage = 'Invalid promo code';
      this.promoMessageClass = 'text-danger';
      this.discount = 0;
      this.calculateGrandTotal();
    }
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      return;
    }

    this.isCheckingOut = true;

    // Add a small delay to show the loading animation
    setTimeout(() => {
      this.router.navigate(['/checkout']);
      this.isCheckingOut = false;
    }, 500);
  }
}
