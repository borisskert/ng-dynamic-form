import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {FormBuilderService} from '../services/form-builder.service';
import {fromFormValue, PaymentDetails} from '../models/payment-details';
import {FormValue} from '../models/form-value';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  standalone: false,
})
export class DynamicFormComponent implements OnInit {
  @Input() set formValues(formValues: FormValue | null) { // TODO PaymentDetails
    if (formValues && this.form) {
      this.form = this.fb.buildFormGroup(formValues);
      this.form.patchValue(formValues);
    }
  }

  @Output() submitForm: EventEmitter<PaymentDetails> = new EventEmitter<PaymentDetails>();

  form!: FormGroup;

  constructor(private fb: FormBuilderService) {
  }

  ngOnInit(): void {
    this.form = this.fb.buildFormGroup(this.formValues!)
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
