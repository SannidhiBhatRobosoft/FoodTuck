import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { StarterMenuComponent } from "./components/starter-menu/starter-menu.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainCourseComponent } from "./components/main-course/main-course.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SigninComponent } from "./components/signin/signin.component";
import { ToastModule } from 'primeng/toast';

import { NotfoundComponent } from './components/notfound/notfound.component';
import { MessageService } from 'primeng/api';
import { FaqComponent } from "./components/faq/faq.component";
import { InputFieldsComponent } from "./shared/input-fields/input-fields.component";
import { BlogComponent } from './pages/blog/blog.component';
import { RightsideofblogComponent } from './components/rightsideofblog/rightsideofblog.component';
import { VerifytokenComponent } from "./components/verifytoken/verifytoken.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, StarterMenuComponent, HeaderComponent, MainCourseComponent, SignUpComponent, SigninComponent, NotfoundComponent, ToastModule, FaqComponent, InputFieldsComponent, BlogComponent, VerifytokenComponent],
  templateUrl: './app.component.html',
  providers: [MessageService],
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'figmacode';
}
