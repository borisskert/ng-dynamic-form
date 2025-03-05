import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {FormValuesService} from './services/form-values.service';
import {FormValue} from './models/form-value';
import {fromFormValue, PaymentDetails} from './models/payment-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  public formValues$: Observable<FormValue>;

  submittedValue: PaymentDetails | undefined;

  constructor(private formValuesService: FormValuesService) {
    this.formValues$ = this.formValuesService.formValues$;
  }

  onSubmitForm($event: PaymentDetails) {
    this.submittedValue = $event;
  }

  onLoadCreditCard() {
    this.formValuesService.loadCreditCard();
  }

  onLoadDebit() {
    this.formValuesService.loadDebit();
  }
}
