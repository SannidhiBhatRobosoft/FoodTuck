import { Component } from '@angular/core';
import { FoodItemsComponent } from "../food-items/food-items.component";
import { NumbersCountComponent } from "../numbers-count/numbers-count.component";
import { MeetOurChefsComponent } from "../meet-our-chefs/meet-our-chefs.component";
import { FoodProcessComponent } from "../food-process/food-process.component";
import { NewsBlogsComponent } from "../news-blogs/news-blogs.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-heropage',
  standalone: true,
  imports: [ NavbarComponent,FoodItemsComponent, NumbersCountComponent, MeetOurChefsComponent, FoodProcessComponent, NewsBlogsComponent],
  templateUrl: './heropage.component.html',
  styleUrl: './heropage.component.css'
})
export class HeropageComponent {
  constructor(private router:Router){}
  routetoabout():void{
    this.router.navigate(['/aboutus'])
  }
}
