import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {PaymentDetailsService} from './services/payment-details.service';
import {PaymentDetails} from './models/payment-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  paymentDetails$: Observable<PaymentDetails>;

  submittedValue: PaymentDetails | undefined;

  constructor(private paymentDetailsService: PaymentDetailsService) {
    this.paymentDetails$ = this.paymentDetailsService.paymentDetails$;
  }

  onSubmitForm($event: PaymentDetails) {
    this.submittedValue = $event;
  }

  onLoadCreditCard() {
    this.paymentDetailsService.loadCreditCard();
  }

  onLoadDebit() {
    this.paymentDetailsService.loadDebit();
  }

  onLoadCreditCardAndDebit() {
    this.paymentDetailsService.loadCreditCardAndDebit();
  }

  onClear() {
    this.paymentDetailsService.clear();
  }
}
