import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StarterMenuComponent } from "../../components/starter-menu/starter-menu.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
@Component({
  selector: 'app-secondpage',
  standalone: true,
  imports: [NavbarComponent, StarterMenuComponent, HeaderComponent, FooterComponent],
  templateUrl: './secondpage.component.html',
  styleUrl: './secondpage.component.css'
})
export class SecondpageComponent {

}
