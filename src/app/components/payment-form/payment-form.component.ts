import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
  standalone: false,
})
export class PaymentFormComponent {
  @Input() form!: FormGroup;

  get creditCardForm(): FormGroup {
    return this.form.get('creditCard') as FormGroup;
  }

  get debitForm(): FormGroup {
    return this.form.get('debit') as FormGroup;
  }

  get paymentMethod(): string {
    return this.form.get('paymentMethod')?.value;
  }

  onPaymentMethodChange() {
    if (this.paymentMethod !== 'creditCard') {
      this.creditCardForm.disable();
    } else {
      this.creditCardForm.enable();
    }

    if (this.paymentMethod !== 'debit') {
      this.debitForm.disable();
    } else {
      this.debitForm.enable();
    }
  }
}
