export interface FormValue {
  name: string;
  payment: FormPayment;
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

export function defaultFormValues(): FormValue {
  return {
    name: '',
    payment: {
      paymentMethod: 'cash',
    }
  };
}
