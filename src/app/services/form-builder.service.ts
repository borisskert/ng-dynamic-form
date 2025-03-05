import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    group['payment'] = this.buildPaymentFormGroup(values?.payment ?? null);

    return this.fb.group(group);
  }

  buildPaymentFormGroup(values: FormPayment | null | undefined = undefined): FormGroup {
    const group: any = {};

    group['paymentMethod'] = this.fb.control(values?.paymentMethod, [Validators.required]);

    if (values?.paymentMethod === 'creditCard') {
      group['creditCard'] = this.buildCreditCardFormGroup(values?.creditCard ?? null);
    } else if (values?.paymentMethod === 'debit') {
      group['debit'] = this.buildDebitFormGroup(values?.debit ?? null);
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

  ensureFormGroup(form: FormGroup, formControlName: string, factory: () => FormGroup): FormGroup {
    if (!form.contains(formControlName)) {
      form.addControl(formControlName, factory());
    }

    return form.get(formControlName) as FormGroup;
  }
}
