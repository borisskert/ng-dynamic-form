import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-debit-form',
  templateUrl: './debit-form.component.html',
  styleUrl: './debit-form.component.css',
  standalone: false,
})
export class DebitFormComponent {
  @Input() form!: FormGroup;
}
