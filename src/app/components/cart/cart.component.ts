import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
  ], // Declare necessary modules
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Array to store cart items
  totalAmount: number = 0; // Total price of cart
  subtotal: number = 0; // Subtotal for the items in the cart
  couponCode: string = ''; // The current coupon code entered
  discount: number = 0; // Discount applied from coupon
  shippingCharge: number = 0; // Shipping charge

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt-token')
      ? JSON.parse(localStorage.getItem('jwt-token') as string)
      : null;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .get<{ items: any[] }>(
        'https://lovely-gelato-95a9f3.netlify.app/api/cart/',
        { headers }
      )
      .subscribe(
        (res) => {
          //this.loading=false
        
          if (res?.items) {
            this.cartItems = res.items; // Assign cart items if they exist
            this.calculateSubtotal(); // Calculate subtotal
            this.calculateTotal(); // Calculate total amount
          } else {
            console.warn('No items found in the cart.');
          }
        },
        (err) => {
          // console.error('Error fetching menu items:', err);
          if(err.status===400){
            alert("Please Login again")
            localStorage.removeItem('jwt-token')
            this.router.navigate(['/login'])
          }
          
         // console.log(err);
        }
      );
  }
  updateInDatabase(id: any, quantity: any): void {
    const payload = { quantity };
    const token = localStorage.getItem('jwt-token')
      ? JSON.parse(localStorage.getItem('jwt-token') as string)
      : null;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  
    this.http
      .put<{ cart: { items: any[] } }>(
        `https://lovely-gelato-95a9f3.netlify.app/api/cart/update/${id}`,
        payload,
        { headers }
      )
      .subscribe(
        (res) => {
          this.ngOnInit();
        },
        (err) => {
          console.error('Error updating cart items:', err);
        }
      );
  }
  
  // Increment quantity of a product
  incrementQuantity(product: any): void {
    const newQuantity = ++product.quantity; // Pre-increment
    this.updateInDatabase(product.id, newQuantity); // Update database with new quantity
  }
  
  // Decrement quantity of a product
  decrementQuantity(product: any): void {
    if (product.quantity > 1) {
      const newQuantity = --product.quantity; // Pre-decrement
      this.updateInDatabase(product.id, newQuantity); // Update database with new quantity
    }
  }
  

  // Remove a product from the cart
  removeProduct(product: any): void {
    const index = product;

    const token = localStorage.getItem('jwt-token')
      ? JSON.parse(localStorage.getItem('jwt-token') as string)
      : null;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    this.http
      .delete<{ cart: { items: any[] } }>(
        `https://lovely-gelato-95a9f3.netlify.app/api/cart/remove/${index}`,
        { headers }
      )
      .subscribe(
        (res) => {
          //this.loading=false
          
          if (res?.cart?.items) {
            this.ngOnInit()
            this.cartItems = res.cart.items; // Assign cart items if they exist
            this.calculateSubtotal(); // Calculate subtotal
            this.calculateTotal(); // Calculate total amount
          } else {
            console.warn('No items found in the cart.');
          }
        },
        (err) => {
          // console.error('Error fetching menu items:', err);
          console.log(err);
        }
      );
  
  }

  // Calculate the subtotal price of items in the cart
  calculateSubtotal(): void {
    this.subtotal = this.cartItems
      .reduce(
        (acc, product) => acc + product.discounted_price * product.quantity,
        0
      )
      .toFixed(2); // Format to two decimal places
  }

  // Calculate the total price of the cart (including shipping and discount)
  calculateTotal(): void {
    this.totalAmount = this.subtotal + this.shippingCharge - this.discount;
  }

  // Apply the coupon and update the discount
  applyCoupon(): void {
    if (this.couponCode === 'DISCOUNT10') {
      this.discount = 0.1 * this.subtotal; // Apply 10% discount
    } else if (this.couponCode === 'DISCOUNT20') {
      this.discount = 0.2 * this.subtotal; // Apply 20% discount
    } else {
      this.discount = 0; // No discount if coupon is invalid
    }
    this.calculateTotal(); // Recalculate total after discount
  }

  // Placeholder for checkout functionality
  checkout(): void {
    this.router.navigate(['/checkout'])
  }
}