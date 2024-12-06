import { Component } from '@angular/core';

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { AboutusComponent } from "../../components/aboutus/aboutus.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";

@Component({
  selector: 'app-aboutuspage',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, AboutusComponent, FooterComponent, TestimonialsComponent],
  templateUrl: './aboutuspage.component.html',
  styleUrl: './aboutuspage.component.css'
})
export class AboutuspageComponent {

}
