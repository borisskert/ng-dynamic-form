import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ]
})
export class AppComponent {
  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      name: ['', Validators.required],  // Static field
      emails: this.fb.array([]), // Dynamic array of emails
    });
  }

  // Get the FormArray
  get emails(): FormArray {
    return this.dynamicForm.get('emails') as FormArray;
  }

  // Add new email field
  addEmail() {
    this.emails.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  // Remove email field by index
  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  // Submit form
  submitForm() {
    if (this.dynamicForm.valid) {
      console.log('Form Data:', this.dynamicForm.value);
    }
  }
}
