import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-leftsideofblog',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './leftsideofblog.component.html',
  styleUrl: './leftsideofblog.component.css'
})
export class LeftsideofblogComponent implements OnInit {
  public blogitems: any[] = []; // Define an array to hold menu items
public loading=true;
  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.http.get<{ data: any[] }>('https://lovely-gelato-95a9f3.netlify.app/api/blog').subscribe(
      res => {
        this.loading=false
        this.blogitems = res.data; 
      },
      err => {
        if(err.status===400){
          alert("Please Login again")
          localStorage.removeItem('jwt-token')
          this.router.navigate(['/login'])
        }
      }
    );
  }
  calculateDate(date: any) {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return d.toLocaleDateString('en-US', options); // 'en-US' gives the required format
  }
  individualsblogdetails(_id:any){
    this.router.navigate([`blog/${_id}`]);
  }
}
