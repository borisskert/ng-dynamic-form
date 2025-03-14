import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MarkFormTouchedDirective} from './directives/mark-form-touched.directive';
import {PaymentFormComponent} from './components/payment-form/payment-form.component';
import {CreditCardFormComponent} from './components/credit-card-form/credit-card-form.component';
import {DynamicFormComponent} from './components/dyncamic-form/dynamic-form.component';
import {DebitFormComponent} from './components/debit-form/debit-form.component';
import {PaymentsFormComponent} from './components/payments-form/payments-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardFormComponent,
    PaymentFormComponent,
    DynamicFormComponent,
    DebitFormComponent,
    PaymentsFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MarkFormTouchedDirective,
    AsyncPipe,
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
