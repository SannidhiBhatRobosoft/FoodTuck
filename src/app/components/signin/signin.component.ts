import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpResponse,
} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputFieldsComponent } from '../../shared/input-fields/input-fields.component';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
function emailGmailValidator(control: any) {
  const email = control.value;
  const temp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  if (email && !temp) {
    return { gmail: true };
  }
  return null;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    InputFieldsComponent,
    NavbarComponent,
    FooterComponent
],
  providers: [MessageService], // Ensure MessageService is provided
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signupForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, emailGmailValidator]],
      password: ['', [Validators.required]],
    });
  }

  get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  // Handle form submission
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.signupForm.valid) {
      this.http
        .post(
          'https://lovely-gelato-95a9f3.netlify.app/api/auth/login',
          this.signupForm.value,
          { observe: 'response' }
        )
        .subscribe(
          (res: HttpResponse<any>) => {
            localStorage.setItem('email',this.signupForm.value.email)
            const jwtToken = res.headers.get('jwt-token'); // Replace with the actual key
            const refreshToken = res.headers.get('Refresh-Token'); // Replace with the actual key

            localStorage.setItem('jwt-token', JSON.stringify(jwtToken));
            localStorage.setItem('Refresh-Token', JSON.stringify(refreshToken));

            this.loading = false;
            this.signupForm.reset();
            // Show success toast on success
            this.messageService.add({
              severity: 'success',
              summary: 'Sign In Successful',
              detail: 'Your where Logined!',
            });
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          },
          (error) => {
            this.loading = false;
            // Show error toast on failure
            this.signupForm.reset();
            this.messageService.add({
              severity: 'error',
              summary: 'Sign Up Failed',
              detail: 'There was an error sigining to your account.',
            });
            // Handle specific HTTP errors
            if (error.status) {
              switch (error.status) {
                case 400:
                  console.log('Bad Request');
                  break;
                case 500:
                  console.log('Internal Server Error');
                  break;
                // Handle other cases here
              }
            }
          }
        );
    } else {
      console.log('Form is invalid!');
    }
  }
}
