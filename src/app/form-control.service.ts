import {Injectable} from '@angular/core';
import {FormCreditCard, FormDebit, FormPayment, FormValue} from './form-value';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor(private fb: FormBuilder) {
  }

  buildFormGroup(values: FormValue | null): FormGroup {
    const group: any = {};

    group['name'] = this.fb.control(values?.name, [Validators.required]);
    group['payment'] = this.buildPaymentFormGroup(values?.payment ?? null);

    return this.fb.group(group);
  }

  buildPaymentFormGroup(values: FormPayment | null): FormGroup {
    const group: any = {};

    group['paymentMethod'] = this.fb.control(values?.paymentMethod, [Validators.required]);

    if (values?.paymentMethod === 'creditCard') {
      group['creditCard'] = this.buildCreditCardFormGroup(values?.creditCard ?? null);
    } else if (values?.paymentMethod === 'debit') {
      group['debit'] = this.buildDebitFormGroup(values?.debit ?? null);
    }

    return this.fb.group(group);
  }

  buildCreditCardFormGroup(values: FormCreditCard | null): FormGroup {
    const group: any = {};

    group['cardNumber'] = this.fb.control(values?.cardNumber, [Validators.required, Validators.pattern(/^\d{16}$/)]);
    group['expiryDate'] = this.fb.control(values?.expiryDate, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
    group['cvv'] = this.fb.control(values?.cvv, [Validators.required, Validators.pattern(/^\d{3}$/)]);

    return this.fb.group(group);
  }

  buildDebitFormGroup(values: FormDebit | null): FormGroup {
    const group: any = {};

    group['accountHolder'] = this.fb.control(values?.accountHolder, [Validators.required]);
    group['iban'] = this.fb.control(values?.iban, [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2} ?\d{4} ?\d{4} ?\d{4} ?\d{4} ?\d{2}$/)]);
    group['bic'] = this.fb.control(values?.bic, [Validators.pattern(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/)]);

    return this.fb.group(group);
  }
}
