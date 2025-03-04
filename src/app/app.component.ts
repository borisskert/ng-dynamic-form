import {Component} from '@angular/core';
import {FormValue} from './form-value';
import {Observable} from 'rxjs';
import {FormValuesService} from './form-values.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  public formValues$: Observable<FormValue>;

  constructor(private formValuesService: FormValuesService) {
    this.formValues$ = this.formValuesService.formValues$;
  }

  onSubmitForm($event: FormValue) {
    console.log('Form values:', $event);
  }

  onLoadValues() {
    this.formValuesService.loadValues();
  }
}
