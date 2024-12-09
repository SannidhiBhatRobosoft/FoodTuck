import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  playvideo() {
    window.location.href = 'https://www.youtube.com/watch?si=jhylp0b18_eAnCAH&v=kRCH8kD1GD0&feature=youtu.be';
  }
  
}
