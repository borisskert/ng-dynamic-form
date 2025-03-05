import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {FormBuilderService} from '../services/form-builder.service';
import {fromFormValue, PaymentDetails} from '../models/payment-details';
import {FormValue, fromPaymentDetails} from '../models/form-value';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  standalone: false,
})
export class DynamicFormComponent implements OnInit {
  private _formValue: FormValue | null = null;

  @Input() set paymentDetails(value: PaymentDetails | null) {
    this._formValue = value ? fromPaymentDetails(value) : null;

    if (this._formValue && this.form) {
      this.form = this.fb.buildFormGroup(this._formValue);
      this.form.patchValue(this._formValue);
    }
  }

  @Output() submitForm: EventEmitter<PaymentDetails> = new EventEmitter<PaymentDetails>();

  form!: FormGroup;

  constructor(private fb: FormBuilderService) {
  }

  ngOnInit(): void {
    this.form = this.fb.buildFormGroup(this._formValue)
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(fromFormValue(this.form.value));
    }
  }

  get paymentsForm(): FormArray {
    return this.fb.ensureFormGroup(
      this.form,
      'payments',
      () => this.fb.buildPaymentsFormGroup()
    ) as FormArray;
  }
}
