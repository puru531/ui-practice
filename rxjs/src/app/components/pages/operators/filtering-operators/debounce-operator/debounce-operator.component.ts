import { AfterViewInit, Component, OnInit } from '@angular/core';
import { debounce, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-debounce-operator',
  templateUrl: './debounce-operator.component.html',
  styleUrls: ['./debounce-operator.component.css']
})
export class DebounceOperatorComponent implements OnInit, AfterViewInit{
  //emits the latest data after given time
  ngOnInit(): void {
      // interval(1000).pipe(debounce(val => interval(val * 100))).subscribe(data => console.log(data));
      //here interval will keep emitting the data after every 1 second.
      //and it will be able to console the data because debounce values will be less than 1 second
      // It will print till 9 ... as soon as 10 will be amitted, the debounce value will become 1 second and I will wait 1 second
      //once debounce will complete 1 second, interval will emit the other value.... and debounce will again star from zero
      // So, no value will be able to get printed after 9.
  }
  ngAfterViewInit(): void {
      let buttonEvent = fromEvent(document.getElementById('debounceButton')!, 'click');
      buttonEvent.pipe(debounce(val => interval(1000))).subscribe(data => console.log(data));
  }

}
