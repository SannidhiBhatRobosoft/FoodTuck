import { Component,ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-blogdetails',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './blogdetails.component.html',
  styleUrl: './blogdetails.component.css',
})
export class BlogdetailsComponent {
  item: any = null; // Define an array to hold menu items
  public loading = true;
  public usercomment: any;
  
  @ViewChild('commentsSection') commentsSection!: ElementRef;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          window.scrollTo(0, 0); // Ensure layout is rendered before scroll
        }, 0);
      }
    });
    const _id = this.route.snapshot.paramMap.get('_id');
    this.http
      .get<{ data: any }>(
        `https://lovely-gelato-95a9f3.netlify.app/api/blog/${_id}`
      )
      .subscribe(
        (res) => {
          this.loading = false;
          this.item = res.data;
        },
        (err) => {
          if(err.status===400){
            alert("Please Login again")
            localStorage.removeItem('jwt-token')
            this.router.navigate(['/login'])
          }else {
            console.error('Error fetching menu items:', err);
          }
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
  addComment() {

    const _id = this.route.snapshot.paramMap.get('_id') || '';
    if (!this.usercomment.trim()) return;
    
    const token = localStorage.getItem('jwt-token')
      ? JSON.parse(localStorage.getItem('jwt-token') as string)
      : null;
      if(!token)
      {
        this.router.navigate(['/login'])
      }
   let commet={
    blogId:_id,
    comment:this.usercomment
   }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Add the token here
      'Content-Type': 'application/json',
    });
    this.http
      .post<{ data: any }>(
        `https://lovely-gelato-95a9f3.netlify.app/api/blog/comments`,
        commet,
        { headers }
      )
      .subscribe(
        (res) => {
          this.loading = false;

           this.item = res.data;
          //window.location.reload();
        },
        (err) => {
          console.error('Error fetching menu items:', err);
        }
      );
  }
 
  showReplyInputIndex: number | null = null;
  replyText: string = '';



  toggleReplyInput(index: number): void {
    this.showReplyInputIndex = this.showReplyInputIndex === index ? null : index;
    this.replyText = ''; // Clear input on toggle
  }

  submitReply(commentId: string): void {
    if (!this.replyText.trim()) return;
    const _id = this.route.snapshot.paramMap.get('_id') || '';
    const token = localStorage.getItem('jwt-token')
    ? JSON.parse(localStorage.getItem('jwt-token') as string)
    : null;
    if(!token)
      {
        this.router.navigate(['/login'])
      }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
   

    const payload =  {
      reply:this.replyText,
      blogId:_id,
      commentId:commentId
    } ;

    this.http
      .post(`https://lovely-gelato-95a9f3.netlify.app/api/blog/replies`, payload, { headers })
      .subscribe(
        (response: any) => {
         
          this.item = response.data; // Update comments with new data
          this.showReplyInputIndex = null; // Close input after submission
        },
        (error) => {
          console.error('Error submitting reply:', error);
        }
      );
  }
  scrollToComments() {
    const element = document.getElementById('comments-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
