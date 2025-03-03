export interface FormValues {
  name: string;
  paymentMethod: string;
  creditCard?: CreditCardFormValues;
}

export interface CreditCardFormValues {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export function defaultFormValues(): FormValues {
  return {
    name: '',
    paymentMethod: 'cash',
  };
}
