import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

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
export class CreditCardFormComponent implements OnInit {
  @Input() formGroupName: string = 'creditCard';

  @Input() parentFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.formGroupName, this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    }));
  }

  get creditCardFormGroup(): FormGroup {
    return this.parentFormGroup.get(this.formGroupName) as FormGroup;
  }
}
