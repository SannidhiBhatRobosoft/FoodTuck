import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwt-token'); // Check for token in localStorage

    if (token) {
      // Token exists, allow access
      return true;
    } else {
      // Token doesn't exist, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
