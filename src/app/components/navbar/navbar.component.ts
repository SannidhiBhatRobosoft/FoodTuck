import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoggedIn = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt-token');
   // console.log(token);
    if(token)
    this.isLoggedIn = true; // Set true if token exists
  
  }

  // Toggles the visibility of the menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout(): void {
    localStorage.removeItem('jwt-token'); // Remove token
    this.isLoggedIn = false; // Update the state
    this.router.navigate(['/']); // Redirect to home
  }

}
