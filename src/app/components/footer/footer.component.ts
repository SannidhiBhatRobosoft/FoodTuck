import { Component, OnInit } from '@angular/core';
import { RecentpostComponent } from '../recentpost/recentpost.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../truncate.pipe';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ HttpClientModule,TruncatePipe,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  recentpost: any[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    this.http
      .get<{ data: any[] }>('https://lovely-gelato-95a9f3.netlify.app/api/blog')
      .subscribe(
        (res) => {
          this.recentpost = res.data;
        },
        (err) => {
         console.log(err);
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
  clickonrecentpost(id:string){
  //  console.log(id);
  
    this.router.navigateByUrl('/blog/' + id, { skipLocationChange: true }).then(() => {
      this.router.navigate(['/blog', id]);
    });
    //window.location.reload()
  }
}
