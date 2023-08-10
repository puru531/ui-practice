import { Component, OnInit } from '@angular/core';
import { interval, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{
  ngOnInit(): void {
             //first value after 1 sec.  on every 2 sec.
    let source$ = timer(1000);
    source$.subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });


    // Build a Date object that marks the
    // next minute.
    const currentDate = new Date();
    console.log('===== ', currentDate);
    const startOfNextMinute = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes() + 1
    );
    console.log('===== ', startOfNextMinute);
    
    // This could be any observable stream
    const source = interval(1000);
    
    const result = source.pipe(
      takeUntil(timer(startOfNextMinute))
    );
    
    result.subscribe(console.log);
  }
}
