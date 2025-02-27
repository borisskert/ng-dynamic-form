import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      paymentMethod: ['cash'],
      creditCard: this.fb.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
        expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      })
    });

    this.toggleCreditCardValidators();
  }

  onPaymentMethodChange() {
    this.toggleCreditCardValidators();
  }

  private toggleCreditCardValidators() {
    if (this.paymentForm.get('paymentMethod')?.value === 'creditCard') {
      this.paymentForm.get('creditCard')?.setValidators(Validators.required);
    } else {
      this.paymentForm.get('creditCard')?.clearValidators();
      this.paymentForm.get('creditCard')?.reset();
    }
    this.paymentForm.get('creditCard')?.updateValueAndValidity();
  }

  submitForm() {
    if (this.paymentForm.invalid) {
      this.markAllFieldsAsTouched(this.paymentForm);
      return;
    }

    if (this.paymentForm.valid) {
      console.log('Form Data:', this.paymentForm.value);
    }
  }

  private markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control); // Recursively mark sub-forms
      } else {
        control.markAsTouched();
      }
    });
  }

  get paymentMethod(): string {
    return this.paymentForm.get('paymentMethod')?.value;
  }

  get creditCardFormGroup(): FormGroup<any> {
    return this.paymentForm.get('creditCard') as FormGroup;
  }
}
