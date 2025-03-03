import {Injectable} from '@angular/core';
import {CreditCardFormValues, FormValues} from './form-values';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor(private fb: FormBuilder) {
  }

  buildFormGroup(values: FormValues | null): FormGroup {
    console.log('values', values);
    const group: any = {};

    group['name'] = this.fb.control(values?.name, [Validators.required]);
    group['paymentMethod'] = this.fb.control(values?.paymentMethod, [Validators.required]);

    if (values?.paymentMethod === 'creditCard') {
      group['creditCard'] = this.buildCreditCardToFormGroup(values?.creditCard ?? null);
    }

    return this.fb.group(group);
  }

  buildCreditCardToFormGroup(values: CreditCardFormValues | null): FormGroup {
    const group: any = {};

    group['cardNumber'] = this.fb.control(values?.cardNumber, [Validators.required, Validators.pattern(/^\d{16}$/)]);
    group['expiryDate'] = this.fb.control(values?.expiryDate, [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
    group['cvv'] = this.fb.control(values?.cvv, [Validators.required, Validators.pattern(/^\d{3}$/)]);

    return this.fb.group(group);
  }
}
