import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  public paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      paymentMethod: ['cash'],
    });
  }

  submitForm() {
    if (this.paymentForm.valid) {
      console.log('Form Data:', this.paymentForm.value);
    }
  }

  get paymentMethod(): string {
    return this.paymentForm.get('paymentMethod')?.value;
  }
}
