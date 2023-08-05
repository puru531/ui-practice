import { Component, OnInit } from '@angular/core';
import { merge, fromEvent, interval, take } from 'rxjs';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit{
  ngOnInit(): void {
      //Flattens multiple Observables together by blending their values into one Observable.
      const clicks = fromEvent(document, 'click');
      const timer = interval(1000).pipe(take(10));
      const clicksOrTimer = merge(clicks, timer);
      clicksOrTimer.subscribe(x => console.log('1st = ', x));
      // Results in the following:
      // timer will emit ascending values, one every second(1000ms) to console
      // clicks logs MouseEvents to console every time the "document" is clicked
      // Since the two streams are merged you see these happening
      // as they occur.



      //Merge together 3 Observables, but run only 2 concurrently
      const timer1 = interval(1000).pipe(take(10));
      const timer2 = interval(2000).pipe(take(6));
      const timer3 = interval(500).pipe(take(10));
      
      const concurrent = 2; // the argument
      const merged = merge(timer1, timer2, timer3, concurrent);
      merged.subscribe(x => console.log('2nd = ', x));
      
      // Results in the following:
      // - First timer1 and timer2 will run concurrently
      // - timer1 will emit a value every 1000ms for 10 iterations
      // - timer2 will emit a value every 2000ms for 6 iterations
      // - after timer1 hits its max iteration, timer2 will
      //   continue, and timer3 will start to run concurrently with timer2
      // - when timer2 hits its max iteration it terminates, and
      //   timer3 will continue to emit a value every 500ms until it is complete


  }
}
