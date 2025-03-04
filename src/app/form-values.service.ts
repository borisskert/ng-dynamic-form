import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {defaultFormValues, FormValue} from './form-value';

@Injectable({
  providedIn: 'root'
})
export class FormValuesService {
  private readonly _formValues$: BehaviorSubject<FormValue> = new BehaviorSubject<FormValue>(defaultFormValues());

  constructor() {
  }

  public get formValues$(): Observable<FormValue> {
    return this._formValues$.asObservable();
  }

  public loadValues() {
    this._formValues$.next({
      name: 'John Doe',
      payment: {
        paymentMethod: 'creditCard',
        creditCard: {
          cardNumber: '1234567890123456',
          expiryDate: '12/22',
          cvv: '123'
        }
      }
    });
    console.log('Values loaded');
  }
}
