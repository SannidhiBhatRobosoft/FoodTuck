import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputFieldsComponent } from "../../shared/input-fields/input-fields.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
function emailGmailValidator(control: any) {
  const email = control.value;
  const temp=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  if (email && !temp) {
    return { gmail: true };
  }
  return null;
}

// Custom validator for password strength (must contain both letters and numbers)
function passwordStrengthValidator(control: any) {
  const password = control.value;
  const hasLetters = /[a-zA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const specialCharacters = /[@$#%]/.test(password);
  if (password && (!hasLetters || !hasNumbers||!specialCharacters)) {
    return { passwordStrength: true };
  }
  return null;
}
function nameValidator(control: FormControl) {
 
  const name = control.value;
  const invalidChars = /[^a-zA-Z\s]/; // Allow only letters and spaces
  const hasNumbers = /\d/; // Check for numbers

  if (name && (invalidChars.test(name) || hasNumbers.test(name))) {
    return { NameError: true }; // Return an error key if invalid
  }
  return null; // Return null if the name is valid
}


@Component({
  selector: 'app-sign-up',
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
  providers: [MessageService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signupForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),nameValidator]],
      email: ['', [Validators.required, Validators.email, emailGmailValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          passwordStrengthValidator,
        ],
      ],
    });
  }

  // Getters for form controls (use bracket notation for TypeScript compatibility)
  get nameControl(): FormControl {
    return this.signupForm.get('name') as FormControl;
  }
  
  get emailControl():FormControl {
    return this.signupForm.get('email') as FormControl ;
  }
  get passwordControl():FormControl {
    return this.signupForm.get('password') as FormControl ;
  }
  

  // Handle form submission
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.signupForm.valid) {
      localStorage.setItem('email',this.signupForm.value.email)
      this.http
        .post(
          'https://lovely-gelato-95a9f3.netlify.app/api/auth/sign-up',
          this.signupForm.value
        )
        .subscribe(
          (res: any) => {
            this.loading = false; // Stop the loading spinner
        
            // Handle the success response properly
            if (res?.message) {
              // Use the response message
              const temp = res.message;
        
              // Show success toast notification
              this.messageService.add({
                severity: 'success',
                summary: 'OTP',
                detail: temp, // Display the message
              });
        
              // Reset the signup form
              this.signupForm.reset();
            } else {
              // Handle the case where `message` is missing
              this.messageService.add({
                severity: 'warn',
                summary: 'Sign Up',
                detail: 'Sign up was successful, but no confirmation message was received.',
              });
            }
          },
          (error) => {
            this.loading = false;
            // Show error toast on failure
            this.messageService.add({
              severity: 'error',
              summary: 'Sign Up Failed',
              detail: 'There was an error creating your account.',
            });
            this.signupForm.reset();
            // Check if the error is an HTTP error
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
