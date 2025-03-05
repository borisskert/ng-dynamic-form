import {FormValue} from './form-value';

export interface PaymentDetails {
  name: string;
  payment: {
    paymentMethod: string;
    paymentDetails: {
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    } | {
      accountHolder: string;
      iban: string;
      bic: string;
    } | null;
  };
}

export function fromFormValue(value: FormValue): PaymentDetails {
  return {
    name: value.name,
    payment: {
      paymentMethod: value.payment.paymentMethod,
      paymentDetails: value.payment.creditCard ?? value.payment.debit ?? null
    }
  };
}
