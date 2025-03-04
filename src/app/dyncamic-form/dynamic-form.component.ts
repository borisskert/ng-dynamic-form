import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormPayment, FormValue} from '../form-value';
import {FormGroup} from '@angular/forms';
import {FormControlService} from '../form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  standalone: false,
})
export class DynamicFormComponent implements OnInit {
  @Input() set formValues(formValues: FormValue | null) {
    if (this.form) {
      this.form = this.fb.buildFormGroup(formValues);
    }
  }

  @Output() submitForm: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  form!: FormGroup;

  constructor(private fb: FormControlService) {
  }

  ngOnInit(): void {
    this.form = this.fb.buildFormGroup(this.formValues!)
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

  get paymentForm(): FormGroup {
    const group = this.form.get('payment') as FormGroup;

    if (group) {
      return group;
    }

    this.form.addControl('payment', this.fb.buildPaymentFormGroup(null));
    return this.form.get('payment') as FormGroup;
  }

  get payment(): FormPayment {
    return this.form.get('payment')?.value;
  }
}
