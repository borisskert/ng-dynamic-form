import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlService} from '../form-control.service';

@Component({
  selector: 'app-debit-form',
  templateUrl: './debit-form.component.html',
  styleUrl: './debit-form.component.css',
  standalone: false,
})
export class DebitFormComponent {
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

  private initForm() {
    if (this._parentForm && this._childFormControlName) {
      this.form = this.ensureDebitForm();
    }
  }

  private ensureDebitForm(): FormGroup {
    return this.fb.ensureFormGroup(
      this._parentForm,
      this._childFormControlName,
      () => this.fb.buildDebitFormGroup()
    );
  }
}
