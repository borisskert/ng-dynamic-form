import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {FormBuilderService} from '../services/form-builder.service';

@Component({
  selector: 'app-payments-form',
  templateUrl: './payments-form.component.html',
  styleUrl: './payments-form.component.css',
  standalone: false,
})
export class PaymentsFormComponent {
  @Input() form!: FormArray;

  constructor(private fb: FormBuilderService) {
  }

  get formGroups(): FormArray {
    return this.form as FormArray;
  }

  formGroupAt(index: number): FormGroup {
    return this.formGroups.at(index) as FormGroup;
  }

  addFormGroup() {
    this.formGroups.push(this.fb.buildPaymentFormGroup());
  }

  removeFormGroupAt(index: number) {
    this.formGroups.removeAt(index);
  }
}
