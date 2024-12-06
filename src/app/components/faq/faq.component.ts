import { Component,ViewChild, ElementRef  } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  
})
export class FaqComponent {
  

  public sections: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the JSON file from assets folder
    this.http.get<{ data: any[] }>('https://lovely-gelato-95a9f3.netlify.app/api/qna').subscribe(
      res => {
      //  this.loading=false
        this.sections = res.data; 
      },
      err => {
        console.error('Error fetching menu items:', err);
      }
  );
  }

  // Toggle function for each section
  toggleContent(sectionId: number): void {
    const section = this.sections.find(s => s._id === sectionId);
    if (section) {
      section.isContentVisible = !section.isContentVisible;
      section.isImageRotated = !section.isImageRotated;
    }
  }
}
