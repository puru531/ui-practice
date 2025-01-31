import { Component } from '@angular/core';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.scss'],
})
export class BasicsComponent {
  name: string = 'Purushottam';
  isBtnDisabled: boolean = true;
  hasError: boolean = false;
  colors: string[] = ['red', 'green', 'blue'];
  color: string = 'red';
  messageClasses: object = {
    'text-success': !this.hasError,
    'text-danger': this.hasError,
    'text-special': this.isBtnDisabled,
  };
  messageStyles: object = {
    color: 'blue',
    fontStyle: 'italic',
  };

  imgUrl: string =
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

  handleClick() {
    alert('Button clicked');
  }
}
