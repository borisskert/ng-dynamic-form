import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css'],
  standalone: false,
})
export class CreditCardFormComponent implements OnInit, OnDestroy {
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

  ngOnDestroy(): void {
    this.parentFormGroup.removeControl(this.formGroupName);
  }

  get creditCardFormGroup(): FormGroup {
    return this.parentFormGroup.get(this.formGroupName) as FormGroup;
  }
}
