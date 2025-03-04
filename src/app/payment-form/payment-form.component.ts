import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormCreditCard, FormDebit} from '../form-value';
import {FormControlService} from '../form-control.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
  standalone: false,
})
export class PaymentFormComponent {
  @Input() form!: FormGroup;

  constructor(private fb: FormControlService) {
  }

  get paymentMethod(): string {
    return this.form.get('paymentMethod')?.value;
  }

  get creditCardForm(): FormGroup {
    const creditCardFormGroup = this.form.get('creditCard') as FormGroup;

    if (creditCardFormGroup) {
      return creditCardFormGroup;
    }

    this.form.addControl('creditCard', this.fb.buildCreditCardFormGroup(null));
    return this.form.get('creditCard') as FormGroup;
  }

  get creditCard(): FormCreditCard {
    return this.form.get('creditCard')?.value;
  }

  get debitForm(): FormGroup {
    const debitFormGroup = this.form.get('debit') as FormGroup;

    if (debitFormGroup) {
      return debitFormGroup;
    }

    this.form.addControl('debit', this.fb.buildDebitFormGroup(null));
    return this.form.get('debit') as FormGroup;
  }

  get debit(): FormDebit {
    return this.form.get('debit')?.value;
  }
}
