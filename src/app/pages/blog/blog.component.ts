import { Component } from '@angular/core';
import { LeftsideofblogComponent } from "../../components/leftsideofblog/leftsideofblog.component";
import { RightsideofblogComponent } from "../../components/rightsideofblog/rightsideofblog.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [LeftsideofblogComponent, RightsideofblogComponent, NavbarComponent, HeaderComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

}
