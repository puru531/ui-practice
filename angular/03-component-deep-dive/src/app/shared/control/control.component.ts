import {Component, ElementRef, inject, input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, // Disable style scoping of the component css
  host: {
    class: 'control', //@HostBinding can also set the class to host element. -> but NOT encouraged
    '(click)': 'onClick()' // @HostListener used to listen to host events --> but not encouraged
  }
})
export class ControlComponent {
  // @HostBinding('class') className= "control"
  label = input.required<string>()

  // @HostListener('click') handleClick() { // NOT recommended to use
  //   console.log('Control clicked')
  // }

  private el = inject(ElementRef); // gives access to host element of the component

  onClick() {
    console.log('Control clicked');
    console.log(this.el.nativeElement);
  }

}
