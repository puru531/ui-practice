import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-cancelling-observable',
  templateUrl: './cancelling-observable.component.html',
  styleUrls: ['./cancelling-observable.component.css']
})
export class CancellingObservableComponent implements OnInit{

  timerConsoleSubscription!: Subscription;
  timerBrowserSubscription!: Subscription;
  timers: number[] = [];

  ngOnInit(): void {
      //const newObservable = interval(1000); //interval is method in rxjs that emits the data from Zero, argument given is every 1 second
      //custom observable   (Memory Leakage)
      const newObservable = new Observable<number>(observer => {
        let i = 0;
        let interval = setInterval(() => {
          console.log("Interval Executing"); //Even after unsubscribing, console.log is being executed, we need to stop the setInterval also --> cleaning of memory leakage
          observer.next(i++);
          if(i === 6) {
            observer.error('Unknown error occurred');
          }
        }, 1000);
        //Cleaning Memory leakage --> will stop the setInterval running even after unsubscription
        return () => {
          console.log("Called when observable is unsubscribed");
          clearInterval(interval);
        }
      });
      this.timerConsoleSubscription = newObservable.subscribe(data => {
        console.log(new Date().toLocaleTimeString(), data);
      });
      this.timerBrowserSubscription = newObservable.subscribe(data => {
        this.timers.push(data);
      });
  }

  cancelTimer() {
    console.log('cancelling timer');
    this.timerConsoleSubscription.unsubscribe();
    this.timerBrowserSubscription.unsubscribe();
  }
}