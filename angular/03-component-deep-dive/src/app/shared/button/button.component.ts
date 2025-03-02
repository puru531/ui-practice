import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton]', // any button element the project having `appButton` as property should be controlled by this component.
  // selector: 'button.button', // using class
  // selector: '[appButton]', // using only attribute
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {}
