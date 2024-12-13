import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-food-items',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './food-items.component.html',
  styleUrl: './food-items.component.css'
})
export class FoodItemsComponent implements OnInit {
  constructor(private http:HttpClient,private router:Router){}
  items:any[]=[]
  ngOnInit(): void {
    const apiUrl = 'https://lovely-gelato-95a9f3.netlify.app/api/shop';
    this.http.get<{ data: any[] }>(apiUrl).subscribe(
      (response) => {
        const categories = response?.data || []; // Fetch categories data
        this.items = categories
          .map((category) => category.foods[0]) // Extract the first food from each category
          .slice(0, 4) // Limit to four items
          .map((food) => ({
            id: food.id,
            name: food.name,
            image: food.images[0], // Get the first image
          }));
      
      },
      (error) => {
        console.error('Error fetching shop data:', error);
      }
    );
  }
  
  navigateToFoodDetails(id: number) {
    this.router.navigate([`/shop/${id}`]);
  }

}
