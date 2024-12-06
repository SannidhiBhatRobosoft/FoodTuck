import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepagenavbar',
  standalone: true,
  imports: [],
  templateUrl: './homepagenavbar.component.html',
  styleUrl: './homepagenavbar.component.css'
})
export class HomepagenavbarComponent implements OnInit {
  isLoggedIn = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwt-token');
    //console.log(token);
    if(token)
    this.isLoggedIn = true; // Set true if token exists
  
  }
  logout(): void {
    localStorage.removeItem('jwt-token'); // Remove token
    this.isLoggedIn = false; // Update the state
    this.router.navigate(['/']); // Redirect to home
  }
}
