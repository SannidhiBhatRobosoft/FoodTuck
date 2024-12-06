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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputFieldsComponent } from '../../shared/input-fields/input-fields.component';
@Component({
  selector: 'app-verifytoken',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    InputFieldsComponent,
  ],
  providers: [MessageService],
  templateUrl: './verifytoken.component.html',
  styleUrl: './verifytoken.component.css',
})
export class VerifytokenComponent {
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
      otp: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  get tokenControl(): FormControl {
    return this.signupForm.get('otp') as FormControl;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.signupForm.valid) {
      this.signupForm.value.email = localStorage.getItem('email');

      this.http
        .post(
          'https://lovely-gelato-95a9f3.netlify.app/api/auth/verify-otp',
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
              this.router.navigate(['/login']);
              // Reset the signup form
              this.signupForm.reset();
            } else {
              // Handle the case where `message` is missing
              this.messageService.add({
                severity: 'warn',
                summary: 'Error',
                detail: 'Error',
              });
            }
          },
          (error) => {
            this.loading = false;
            // Show error toast on failure
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to verify OTP',
              detail: 'OTP will expire in 5min',
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
