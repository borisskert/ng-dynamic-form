import {PaymentDetails} from './payment-details';

export interface FormValue {
  name: string;
  payments: FormPayment[];
}

export interface FormPayment {
  paymentMethod: string;
  creditCard?: FormCreditCard;
  debit?: FormDebit;
}

export interface FormCreditCard {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface FormDebit {
  accountHolder: string;
  iban: string;
  bic: string;
}

export function fromPaymentDetails(value: PaymentDetails): FormValue {
  return {
    name: value.name,
    payments: value.payments.map((payment) => {
      if (payment.paymentMethod === 'creditCard') {
        return {
          paymentMethod: payment.paymentMethod,
          creditCard: payment.paymentDetails as FormCreditCard
        };
      } else if (payment.paymentMethod === 'debit') {
        return {
          paymentMethod: payment.paymentMethod,
          debit: payment.paymentDetails as FormDebit
        };
      } else {
        return {
          paymentMethod: payment.paymentMethod
        };
      }
    })
  };
}
