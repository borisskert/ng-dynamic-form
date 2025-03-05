import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {defaultPaymentDetails, PaymentDetails} from '../models/payment-details';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {
  private readonly _paymentDetails$: BehaviorSubject<PaymentDetails> = new BehaviorSubject<PaymentDetails>(defaultPaymentDetails());

  constructor() {
  }

  public get paymentDetails$(): Observable<PaymentDetails> {
    return this._paymentDetails$.asObservable();
  }

  public loadCreditCard() {
    this._paymentDetails$.next({
      name: 'John Doe',
      payments: [{
        paymentMethod: 'creditCard',
        paymentDetails: {
          cardNumber: '1234567890123456',
          expiryDate: '12/22',
          cvv: '123'
        }
      }]
    });
  }

  public loadDebit() {
    this._paymentDetails$.next({
      name: 'John Doe',
      payments: [{
        paymentMethod: 'debit',
        paymentDetails: {
          accountHolder: 'John Doe',
          iban: 'DE12345678901234567890',
          bic: 'GENODEF1M04'
        }
      }]
    });
  }

  public loadCreditCardAndDebit() {
    this._paymentDetails$.next({
      name: 'John Doe',
      payments: [{
        paymentMethod: 'creditCard',
        paymentDetails: {
          cardNumber: '1234567890123456',
          expiryDate: '12/22',
          cvv: '123'
        }
      }, {
        paymentMethod: 'debit',
        paymentDetails: {
          accountHolder: 'John Doe',
          iban: 'DE12345678901234567890',
          bic: 'GENODEF1M04'
        }
      }]
    });
  }

  public clear() {
    this._paymentDetails$.next(defaultPaymentDetails());
  }
}
