import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreditCardFormValues, FormValues} from '../form-values';
import {FormGroup} from '@angular/forms';
import {FormControlService} from '../form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  standalone: false,
})
export class DynamicFormComponent implements OnInit {
  @Input() set formValues(formValues: FormValues | null) {
    if (this.form) {
      this.form = this.fb.buildFormGroup(formValues);
    }
  }

  @Output() submitForm: EventEmitter<FormValues> = new EventEmitter<FormValues>();

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

  get paymentMethod(): string {
    return this.form.get('paymentMethod')?.value;
  }

  get creditCardForm(): FormGroup {
    const creditCardFormGroup = this.form.get('creditCard') as FormGroup;

    if (creditCardFormGroup) {
      return creditCardFormGroup;
    }

    this.form.addControl('creditCard', this.fb.buildCreditCardToFormGroup(null));
    return this.form.get('creditCard') as FormGroup;
  }

  get creditCard(): CreditCardFormValues {
    return this.form.get('creditCard')?.value;
  }
}
