export interface FormValue {
  name: string;
  payment: FormPayment;
}

export interface FormPayment {
  paymentMethod: string;
  creditCard?: FormCreditCard;
}

export interface FormCreditCard {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export function defaultFormValues(): FormValue {
  return {
    name: '',
    payment: {
      paymentMethod: 'cash',
    }
  };
}
