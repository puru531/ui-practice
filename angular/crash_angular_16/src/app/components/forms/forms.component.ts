import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent {
  /**
   * Forms in Angular are used to collect user input data.
   *
   * Angular provides two ways to work with forms:
   * 1. Template-driven forms
   * 2. Reactive forms
   *
   * Template-driven forms:
   * - Template-driven forms are used for simple forms.
   * - They are easy to use and suitable for small applications.
   * - They are used when the form is not complex and the data is not sensitive.
   * - They are easy to create and maintain.
   * - They are suitable for small applications.
   *
   * Reactive forms:
   * - Reactive forms are used for complex forms.
   * - They are used when the form is complex and the data is sensitive.
   * - They are used when the form is dynamic and the data is changing frequently.
   * - They are suitable for large applications.
   * - They are easy to test.
   *
   *
   */

  /**
   * In order to work with forms in Angular, you need to import the FormsModule module in the app.module.ts file.
   * The FormsModule module is used to work with template-driven forms.
   *
   * NgForm is a directive that is used to create a form in Angular. It is used to bind the form element to the form model.
   *
   */

  user = {
    name: '',
    email: '',
  };

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
