import { Component, OnInit } from '@angular/core';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-take-while',
  templateUrl: './take-while.component.html',
  styleUrls: ['./take-while.component.css']
})
export class TakeWhileComponent implements OnInit {
  ngOnInit(): void {
      interval(500).pipe(takeWhile((x, i) => x < 5, true)).subscribe(data => console.log(data)); // Interval will keep on emitting that data until the condition inside takeWhile is satisfied. Another true parameter in takeWhile is inclusive, means if we want to include that value also, which is causing the the condition to get false. I in the condition is index.
  }
}
