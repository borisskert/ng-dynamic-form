import {Component, forwardRef, Input} from '@angular/core';
import {FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreditCardFormComponent),
      multi: true
    }
  ]
})
export class CreditCardFormComponent {
  @Input() creditCardForm!: FormGroup;
}
