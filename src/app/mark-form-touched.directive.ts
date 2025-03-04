import {Directive, HostListener, Self} from '@angular/core';
import {AbstractControl, ControlContainer, FormGroup} from '@angular/forms';

@Directive({
  selector: 'form[formGroup]'
})
export class MarkFormTouchedDirective {
  @HostListener('submit')
  onSubmit() {
    let control = this.container.control;

    if (control)
      this.markFormControlFieldsAsTouched(control)
  }

  constructor(@Self() private container: ControlContainer) {
  }

  private markFormGroupFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      this.markFormControlFieldsAsTouched(control);
    });
  }

  private markFormControlFieldsAsTouched(control: AbstractControl) {
    if (control instanceof FormGroup) {
      this.markFormGroupFieldsAsTouched(control); // Recursively mark sub-forms
    } else {
      control.markAsTouched();
    }
  }
}
