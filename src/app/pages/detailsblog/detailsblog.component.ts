import { Component } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';

import { FooterComponent } from '../../components/footer/footer.component';
import { BlogdetailsComponent } from '../../components/blogdetails/blogdetails.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
@Component({
  selector: 'app-detailsblog',
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    BlogdetailsComponent,
    FooterComponent,
  ],
  templateUrl: './detailsblog.component.html',
  styleUrl: './detailsblog.component.css',
})
export class DetailsblogComponent {}
