import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private cartItems = new BehaviorSubject<any[]>([]);

  constructor() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(product: any) {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({...product, quantity: 1});
    }

    this.cartItems.next([...currentItems]);
    this.saveCartToLocalStorage();
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.cartItems.next(updatedItems);
    this.saveCartToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.cartItems.getValue();
    const itemToUpdate = currentItems.find(item => item.id === productId);

    if (itemToUpdate) {
      itemToUpdate.quantity = quantity;
      this.cartItems.next([...currentItems]);
      this.saveCartToLocalStorage();
    }
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.getValue()));
  }
}
