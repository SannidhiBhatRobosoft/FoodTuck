import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SecondpageComponent } from './pages/menupage/secondpage.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SigninComponent } from './components/signin/signin.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutuspageComponent } from './pages/aboutuspage/aboutuspage.component';
import { DetailsblogComponent } from './pages/detailsblog/detailsblog.component';
import { ShoppingComponent } from './pages/shopping/shopping.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { VerifytokenComponent } from './components/verifytoken/verifytoken.component';
import { CareereComponent } from './careere/careere.component';
export const routes: Routes = [
  { path: 'menu', component: SecondpageComponent, canActivate: [AuthGuard] },
  { path: '', component: HomepageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: SigninComponent },
  { path: 'blog', component: BlogComponent , },
  { path: 'blog/:_id', component: DetailsblogComponent,  },
  { path: 'aboutus', component: AboutuspageComponent },
  { path: 'shop', component: ShoppingComponent },
  { path: 'cart', component: CartComponent , canActivate: [AuthGuard]},
  { path: 'shop/:_id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'verifytoken', component: VerifytokenComponent },
  
  { path: '**', component: NotfoundComponent},
];
