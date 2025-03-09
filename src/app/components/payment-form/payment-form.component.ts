import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormBuilderService} from '../../services/form-builder.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
  standalone: false,
})
export class PaymentFormComponent {
  @Input() form!: FormGroup;

  constructor(private fb: FormBuilderService) {
  }

  get creditCardForm(): FormGroup {
    return this.fb.ensureFormGroup(
      this.form,
      'creditCard',
      () => this.fb.buildCreditCardFormGroup()
    ) as FormGroup
  }

  get debitForm(): FormGroup {
    return this.fb.ensureFormGroup(
      this.form,
      'debit',
      () => this.fb.buildDebitFormGroup()
    ) as FormGroup;
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
