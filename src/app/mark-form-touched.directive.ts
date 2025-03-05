import {Directive, HostListener, Self} from '@angular/core';
import {AbstractControl, ControlContainer, FormArray, FormGroup} from '@angular/forms';

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

  private markFormArrayElementsAsTouched(formGroup: FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      this.markFormControlFieldsAsTouched(control);
    })
  }

  private markFormControlFieldsAsTouched(control: AbstractControl) {
    if (control instanceof FormGroup) {
      this.markFormGroupFieldsAsTouched(control);
    } else if (control instanceof FormArray) {
      this.markFormArrayElementsAsTouched(control);
    } else {
      control.markAsTouched();
    }
  }
}
