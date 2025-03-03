import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {defaultFormValues, FormValues} from './form-values';

@Injectable({
  providedIn: 'root'
})
export class FormValuesService {
  private readonly _formValues$: BehaviorSubject<FormValues> = new BehaviorSubject<FormValues>(defaultFormValues());

  constructor() {
  }

  public get formValues$(): Observable<FormValues> {
    return this._formValues$.asObservable();
  }

  public loadValues() {
    this._formValues$.next({
      name: 'John Doe',
      paymentMethod: 'creditCard',
      creditCard: {
        cardNumber: '1234567890123456',
        expiryDate: '12/22',
        cvv: '123'
      }
    });
    console.log('Values loaded');
  }
}
