import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule,FormControl } from '@angular/forms';
@Component({
  selector: 'app-input-fields',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './input-fields.component.html',
  styleUrl: './input-fields.component.css'
})
export class InputFieldsComponent {
  @Input() label!: string; // Label for the input
  @Input() type: string = 'text'; // Input type (e.g., text, email, password)
  @Input() name!: string; // Name attribute
  @Input() placeholder!: string; // Placeholder text
  @Input() iconSrc?: string; // Optional icon
  @Input() control!: FormControl; // FormControl passed from parent
  @Input() errorMessages: { [key: string]: string } = {}; // Error messages map
  get errorKeys() {
    return Object.keys(this.control.errors || {}) as string[];
  }

}
