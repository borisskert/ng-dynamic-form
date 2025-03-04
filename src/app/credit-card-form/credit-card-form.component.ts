import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormBuilderService} from '../form-builder.service';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css'],
  standalone: false,
})
export class CreditCardFormComponent {
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

  constructor(private fb: FormBuilderService) {
  }

  private initForm() {
    if (this._parentForm && this._childFormControlName) {
      this.form = this.ensureChildForm();
    }
  }

  private ensureChildForm() {
    return this.fb.ensureFormGroup(
      this._parentForm,
      this._childFormControlName,
      () => this.fb.buildCreditCardFormGroup()
    );
  }
}
