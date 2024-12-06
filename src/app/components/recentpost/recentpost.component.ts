import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../truncate.pipe';
@Component({
  selector: 'app-recentpost',
  standalone: true,
  imports: [HttpClientModule,CommonModule,TruncatePipe],
  templateUrl: './recentpost.component.html',
  styleUrl: './recentpost.component.css'
})
export class RecentpostComponent implements OnInit {
  public recentpost:any[]=[]
  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.http.get<{ data: any[] }>('https://lovely-gelato-95a9f3.netlify.app/api/blog').subscribe(
      res => {
      //  console.log(res.data)
        this.recentpost = res.data; 
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
}
