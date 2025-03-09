import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormCreditCard, FormDebit, FormPayment, FormValue} from '../models/form-value';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private fb: FormBuilder) {
  }

  buildFormGroup(values: FormValue | null | undefined = undefined): FormGroup {
    const group: any = {};

    group['name'] = this.fb.control(values?.name, [Validators.required]);
    group['payments'] = this.buildPaymentsFormGroup(values?.payments);

    return this.fb.group(group);
  }

  buildPaymentsFormGroup(values: FormPayment[] | undefined = undefined): AbstractControl {
    if (!values) {
      return this.fb.array([this.buildPaymentFormGroup()]);
    }

    const paymentForms = values
      .map((payment) => {
        return this.buildPaymentFormGroup(payment);
      }) || [this.buildPaymentFormGroup()];

    return this.fb.array(paymentForms);
  }

  buildPaymentFormGroup(values: FormPayment | null | undefined = undefined): FormGroup {
    const group: any = {};

    group['paymentMethod'] = this.fb.control(values?.paymentMethod, [Validators.required]);
    group['creditCard'] = this.buildCreditCardFormGroup(values?.creditCard ?? null);
    group['debit'] = this.buildDebitFormGroup(values?.debit ?? null);

    if (values?.paymentMethod !== 'creditCard') {
      group['creditCard'].disable()
    }

    if (values?.paymentMethod !== 'debit') {
      group['debit'].disable();
    }

    return this.fb.group(group);
  }

  buildCreditCardFormGroup(values: FormCreditCard | null | undefined = undefined): FormGroup {
    const group: any = {};

    group['cardNumber'] = this.fb.control(values?.cardNumber, [Validators.required, Validators.pattern(/^\d{16}$/)]);
    group['expiryDate'] = this.fb.control(values?.expiryDate, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
    group['cvv'] = this.fb.control(values?.cvv, [Validators.required, Validators.pattern(/^\d{3}$/)]);

    return this.fb.group(group);
  }

  buildDebitFormGroup(values: FormDebit | null | undefined = undefined): FormGroup {
    const group: any = {};

    group['accountHolder'] = this.fb.control(values?.accountHolder, [Validators.required]);
    group['iban'] = this.fb.control(values?.iban, [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4} ?\d{2}$/)]);
    group['bic'] = this.fb.control(values?.bic, [Validators.pattern(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/)]);

    return this.fb.group(group);
  }
}
