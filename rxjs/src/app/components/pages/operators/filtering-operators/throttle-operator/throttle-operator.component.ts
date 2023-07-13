import { Component, OnInit } from '@angular/core';
import { interval, throttle } from 'rxjs';

@Component({
  selector: 'app-throttle-operator',
  templateUrl: './throttle-operator.component.html',
  styleUrls: ['./throttle-operator.component.css']
})
export class ThrottleOperatorComponent implements OnInit{
  ngOnInit(): void {
     interval(1000).pipe(throttle(val => interval(2000), {leading: true, trailing: true})).subscribe(data => console.log(data)); 
  }

  // first 0 will be passed to throttle 0 is first value so it will be emitted by throttle bcause leading is true.
  // again 1 and 2 will pass in between to throttle --> 2 in trailing value so it will be emitted by throttle bcause trailing is true.
  // again 4 and 6 is trailing
  // output --> 0,2,4,6,8......
}
