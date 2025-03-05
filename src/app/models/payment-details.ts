import {FormValue} from './form-value';

export interface PaymentDetails {
  name: string;
  payments: {
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
  }[];
}

export function fromFormValue(value: FormValue): PaymentDetails {
  return {
    name: value.name,
    payments: value.payments.map((payment) => ({
      paymentMethod: payment.paymentMethod,
      paymentDetails: payment.creditCard ?? payment.debit ?? null
    }))
  };
}
