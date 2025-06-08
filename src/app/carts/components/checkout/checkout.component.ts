import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from '../../services/carts.service';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  shipping: number = 30;
  discount: number = 0;
  grandTotal: number = 0;
  isProcessing: boolean = false;
  orderPlaced: boolean = false;
  
  checkoutForm: CheckoutForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  };

  constructor(
    private cartService: CartsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      if (this.cartItems.length === 0) {
        // Redirect to cart if no items
        this.router.navigate(['/cart']);
        return;
      }
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => 
      acc + (item.price * item.quantity), 0);
    this.grandTotal = this.total + this.shipping - this.discount;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.processOrder();
    }
  }

  validateForm(): boolean {
    const form = this.checkoutForm;
    
    if (!form.firstName || !form.lastName || !form.email || 
        !form.phone || !form.address || !form.city || !form.postalCode) {
      alert('Please fill in all required fields');
      return false;
    }

    if (!this.isValidEmail(form.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (form.paymentMethod === 'card') {
      if (!form.cardNumber || !form.expiryDate || !form.cvv || !form.cardName) {
        alert('Please fill in all card details');
        return false;
      }
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  processOrder() {
    this.isProcessing = true;
    
    // Simulate order processing
    setTimeout(() => {
      this.isProcessing = false;
      this.orderPlaced = true;
      
      // Clear cart after successful order
      this.cartService.clearCart();
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
    }, 2000);
  }

  goBackToCart() {
    this.router.navigate(['/cart']);
  }
}
