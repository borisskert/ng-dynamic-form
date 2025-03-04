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

import {CreditCardFormComponent} from './credit-card-form/credit-card-form.component';
import {MarkFormTouchedDirective} from './mark-form-touched.directive';
import {DynamicFormComponent} from './dyncamic-form/dynamic-form.component';
import {AsyncPipe} from '@angular/common';
import {PaymentFormComponent} from './payment-form/payment-form.component';
import {DebitFormComponent} from './debit-form/debit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardFormComponent,
    PaymentFormComponent,
    DynamicFormComponent,
    DebitFormComponent,
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
