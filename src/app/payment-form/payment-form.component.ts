import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlService} from '../form-control.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
  standalone: false,
})
export class PaymentFormComponent {
  private _childFormControlName!: string;
  @Input() set childFormControlName(value: string) {
    // We need to make sure that the form is created as early as possible, so we need to implement
    // the setters for the childFormControl and parentForm properties. Otherwise, the form will not accept
    // loaded values from the parent form.
    this._childFormControlName = value;
    this.initForm()
  }

  private _parentForm!: FormGroup;
  @Input() set parentForm(value: FormGroup) {
    this._parentForm = value;
    this.initForm()
  }

  form!: FormGroup;

  constructor(private fb: FormControlService) {
  }

  get paymentMethod(): string {
    return this.form.get('paymentMethod')?.value;
  }

  private initForm() {
    if (this._parentForm && this._childFormControlName) {
      this.form = this.ensurePaymentForm();
    }
  }

  private ensurePaymentForm(): FormGroup {
    return this.fb.ensureFormGroup(
      this._parentForm,
      this._childFormControlName,
      () => this.fb.buildPaymentFormGroup()
    )
  }
}
