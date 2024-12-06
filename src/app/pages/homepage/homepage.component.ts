import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HeropageComponent } from '../../components/heropage/heropage.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NumbersCountComponent } from '../../components/numbers-count/numbers-count.component';
import { FoodItemsComponent } from '../../components/food-items/food-items.component';
import { MeetOurChefsComponent } from '../../components/meet-our-chefs/meet-our-chefs.component';
import { FoodProcessComponent } from '../../components/food-process/food-process.component';
import { NewsBlogsComponent } from '../../components/news-blogs/news-blogs.component';
import { FaqComponent } from "../../components/faq/faq.component";
import { HomepageaboutusComponent } from '../../components/homepageaboutus/homepageaboutus.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    
    HeaderComponent,
    HeropageComponent,
    FooterComponent,
    NumbersCountComponent,
    FoodItemsComponent,
    MeetOurChefsComponent,
    FoodProcessComponent,
    NewsBlogsComponent,
    FaqComponent,
    HomepageaboutusComponent,
    WhyChooseUsComponent,
    TestimonialsComponent
],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
