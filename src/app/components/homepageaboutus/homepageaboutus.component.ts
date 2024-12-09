import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepageaboutus',
  standalone: true,
  imports: [],
  templateUrl: './homepageaboutus.component.html',
  styleUrl: './homepageaboutus.component.css'
})
export class HomepageaboutusComponent {
  constructor(private router:Router){}
  routetoabout():void{
    this.router.navigate(['/aboutus'])
  }
}
