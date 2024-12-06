import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-news-blogs',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './news-blogs.component.html',
  styleUrl: './news-blogs.component.css',
})
export class NewsBlogsComponent implements OnInit {
  public bloglist: any[] = [];
  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.http
      .get<{ data: any[] }>('https://lovely-gelato-95a9f3.netlify.app/api/blog')
      .subscribe(
        (res) => {
          this.bloglist = res.data;
        },
        (err) => {
          console.error('Error fetching menu items:', err);
        }
      );
  }
  calculateDate(date: any) {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return d.toLocaleDateString('en-US', options); // 'en-US' gives the required format
  }
  clickonrecentpost(id:number){
    this.router.navigate([`/blog/${id}`]);
  }
}
