import {Component, forwardRef, Input, OnDestroy} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {CreditCardFormValues} from '../form-values';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css'],
  standalone: false,
})
export class CreditCardFormComponent {
  @Input() set creditCard(creditCard: CreditCardFormValues | null) {
    if (creditCard && this.form) {
      this.form.patchValue(creditCard);
    }
  }

  @Input() form!: FormGroup;
}
