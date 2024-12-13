import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false;
  cartItems: any[] = [];
  constructor(private router: Router, private http: HttpClient) {}
  isSidebarOpen: boolean = false;
  userName: string | null = '';
  ngOnInit(): void {
    const token = localStorage.getItem('jwt-token')
      ? JSON.parse(localStorage.getItem('jwt-token') as string)
      : null;
      const email = localStorage.getItem('email') || 'Guest';
  this.userName = email.includes('@') ? email.split('@')[0] : email;
    if (token) {
      this.isLoggedIn = true; // Set true if token exists

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
            if (res?.items) {
              this.cartItems = res.items; // Assign cart items if they exist
             // console.log(this.cartItems.length);
            }
          },
          (err) => {}
        );
    }
  }

  // Toggles the visibility of the menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout(): void {
    localStorage.removeItem('jwt-token'); // Remove token
    localStorage.removeItem('email'); // Remove token
    this.isLoggedIn = false; // Update the state
    this.isSidebarOpen = false;
    window.location.reload()
    this.router.navigate(['/']); // Redirect to home
  }
  routetoCart(): void {
    this.router.navigate(['/cart']); // Redirect to home
  }
  toggleSidebar(): void {
    
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  routetologin():void{
    this.router.navigate(['/login']);
  }
  Handlelogoclick():void{
    this.router.navigate(['/']);
  }

}
