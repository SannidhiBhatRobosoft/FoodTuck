import { HttpClient } from '@angular/common/http';
import { Component, OnInit,HostListener  } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-starter-menu',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './starter-menu.component.html',
  styleUrl: './starter-menu.component.css'
})
export class StarterMenuComponent implements OnInit{
  public menuitems: any[] = []; // Define an array to hold menu items
public loading=true;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkScreenWidth();
    this.http.get<{ data: any[] }>('https://lovely-gelato-95a9f3.netlify.app/api/menu').subscribe(
      res => {
        this.loading=false
        this.menuitems = res.data; 
      },
      err => {
        console.error('Error fetching menu items:', err);
      }
    );
  }
  isSmallScreen: boolean = false;

  
  

   // Check screen width dynamically
   @HostListener('window:resize', ['$event'])
   onResize() {
     this.checkScreenWidth();
   }
   private checkScreenWidth(): void {
    this.isSmallScreen = window.innerWidth <= 400; // Adjust threshold as needed
  }
}
