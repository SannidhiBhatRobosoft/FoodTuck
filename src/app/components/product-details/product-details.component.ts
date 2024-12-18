import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule, ButtonModule, CommonModule, FormsModule, ToastModule, NavbarComponent, FooterComponent],
  providers: [MessageService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  quantity = 1;
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top
      }
    });
    const _id = this.route.snapshot.paramMap.get('_id');
    this.http
      .get<{ data: any }>(
        `https://lovely-gelato-95a9f3.netlify.app/api/shop/${_id}`
      )
      .subscribe(
        (res) => {
          this.product = res.data;
          // console.log(this.product);
        },
        (err) => {
          console.error('Error fetching menu items:', err);
        }
      );
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    const foodId = this.route.snapshot.paramMap.get('_id');
    let item = {
      foodId: foodId,
      quantity: this.quantity,
    };
    //  const token =
    //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjY3NDViNjUxNjU0OGM4ODVmMGZjMzdlMiJ9LCJpYXQiOjE3MzMyMTkxNjIsImV4cCI6MTczMzI2MjM2Mn0.cKKyYNM_3-up0C5fslrKDi-gqwhNPGeGxotdaRbJods';
    const token = localStorage.getItem('jwt-token')
      ? JSON.parse(localStorage.getItem('jwt-token') as string)
      : null;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    this.http
      .post<{ data: any }>(
        `https://lovely-gelato-95a9f3.netlify.app/api/cart/add`,
        item,
        { headers }
      )
      .subscribe(
        (res: any) => {
          //console.log(res.message);

          if (res?.message) {
            const temp = res.message;
            this.messageService.add({
              severity: 'success',
              summary: 'Added',
              detail: temp, // Display the message
            });
          }
          window.location.reload();
        },
        (err) => {
          if(err.status===400){
            alert("Please Login again")
            localStorage.removeItem('jwt-token')
            this.router.navigate(['/login'])
          }
        }
      );
  }
}
