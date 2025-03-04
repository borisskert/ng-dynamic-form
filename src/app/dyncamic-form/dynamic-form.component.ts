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
    if (formValues && this.form) {
      this.form = this.fb.buildFormGroup(formValues);
      this.form.patchValue(formValues);
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
}
