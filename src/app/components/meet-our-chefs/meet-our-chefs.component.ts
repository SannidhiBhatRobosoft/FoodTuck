import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-meet-our-chefs',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './meet-our-chefs.component.html',
  styleUrl: './meet-our-chefs.component.css',
})
export class MeetOurChefsComponent implements OnInit {
  chefs: any[] = [];
  value = 4;
  length:number=0
  temp: boolean = true;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get<{ data: any[] }>(
        'https://lovely-gelato-95a9f3.netlify.app/api/chefs'
      )
      .subscribe(
        (res) => {
          this.chefs = res.data;
          this.length=this.chefs.length
        },
        (err) => {
          console.error('Error fetching menu items:', err);
        }
      );
  }
  seeMore() {
    this.value += 4;
    if (this.value >= this.length) {
      this.temp = false; // All items are shown, switch to "See Less"
    }
  }
  
  seeless() {
    this.value = Math.max(4, this.value - 4); // Ensure a minimum of 4 items are shown
    if (this.value < this.length) {
      this.temp = true; // Switch back to "See More"
    }
  }
}
