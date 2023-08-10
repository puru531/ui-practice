import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, takeUntil, range, count } from 'rxjs';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit{
  ngOnInit(): void {
      //Tells how many values were emitted, when the source completes.
      const seconds = interval(1000);
      const clicks = fromEvent(document, 'click');
      const secondsBeforeClick = seconds.pipe(takeUntil(clicks));
      const result = secondsBeforeClick.pipe(count());
      result.subscribe(x => console.log(x));


      const numbers = range(1, 7);
      const result2 = numbers.pipe(count(i => i % 2 === 1));
      result2.subscribe(x => console.log(x));
      // Results in:
      // 4
  }
}
