import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormDebit} from '../form-value';

@Component({
  selector: 'app-debit-form',
  templateUrl: './debit-form.component.html',
  styleUrl: './debit-form.component.css',
  standalone: false,
})
export class DebitFormComponent {
  @Input() set debitInfo(debitInfo: FormDebit | null) {
    if (debitInfo && this.form) {
      this.form.patchValue(debitInfo);
    }
  }

  @Input() form!: FormGroup;
}
