import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ShopComponent } from "../../components/shop/shop.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [NavbarComponent, ShopComponent, FooterComponent],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent {

}
