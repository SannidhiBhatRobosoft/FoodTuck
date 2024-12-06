import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
 
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private router:Router){}
  shipping = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    city: '',
    zip: '',
    address1: '',
    address2: ''
  };
 
  billing = {
    address1: '',
    address2: '',
    country: '',
    city: '',
    zip: ''
  };
 
  sameAsShipping = false;
 
  countries = ['USA', 'Canada', 'India', 'UK'];
  cities = ['New York', 'Los Angeles', 'London', 'Delhi'];
 
  // Method to handle "Back to Cart"
  backToCart() {
    this.router.navigate(['/cart'])
  }
 
  // Method to handle "Place Order"
  placeOrder() {
    console.log('Order placed:', this.shipping, this.billing);
  }
 
  // Method to handle "Proceed to Shipping"
  proceedToShipping() {
    console.log('Proceeding to shipping...');
  }
}