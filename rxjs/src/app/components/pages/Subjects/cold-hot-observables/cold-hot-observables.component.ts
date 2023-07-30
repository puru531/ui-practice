import { Component, OnInit } from '@angular/core';
import { Observable, Subject, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'app-cold-hot-observables',
  templateUrl: './cold-hot-observables.component.html',
  styleUrls: ['./cold-hot-observables.component.css']
})
export class ColdHotObservablesComponent  implements OnInit{
  //Converting cold observable to hot observable.
  ngOnInit(): void {

    //Example of cold observable
      let observable$ = new Observable(observer => {
        observer.next(Math.random())
      });

      observable$.subscribe(data => {
        console.log('1' + data); // data = 0.01404920622699346
      }, err => {
        console.log(err);
      });

      observable$.subscribe(data => {
        console.log('2', data); // data = 0.7076003330098246
      }, err => {
        console.log('2', err);
      });
      //Here both observers are getting different values,
      //that means observable is getting subscribed twice
      //and data is also created twice --> cold observable. --> unicast

      //Although we can save math.random in a variable before declaring the observable,
      //we will able to create data outsude and will able to send same data to both observers
      //but it will not be fully hot observable



      //example of hot observable
      let documentClick$ = fromEvent(document, 'click');

      documentClick$.subscribe(data => {
        console.log((data as PointerEvent).clientX);
      }, err => {
        console.log(err);
      });
      documentClick$.subscribe(data => {
        console.log((data as PointerEvent).clientX);
      }, err => {
        console.log(err);
      });
      //both the observers are getting same values.
      // --> Hot Observable --> Multicast



      //Converting cold observable to hot observable
      let interval$ = interval(1000);
/*
      interval$.subscribe(data => {
        console.log('observer  1 = ', data);
      }, err => {
        console.log(err);
      });

      setTimeout(() => {
        interval$.subscribe(data => {
          console.log('observer  2 = ', data); //after 2 seconds it will start from zero, if directly subscribed to observable. --> cold observable
          //but if subscribed to subject, after 2 seconds, it will start from 2 matching with above observer. --> hot observable
        }, err => {
          console.log(err);
        });
      }, 2000);

      */

      //make hot using subject
      let subject$ = new Subject();
      interval$.subscribe(subject$);

      subject$.subscribe(data => {
        console.log('observer  1 = ', data);
      }, err => {
        console.log(err);
      });

      setTimeout(() => {
        subject$.subscribe(data => {
          console.log('observer  2 = ', data); // after 2 seconds, it will start from 2 matching with above observer. --> hot observable
        }, err => {
          console.log(err);
        });
      }, 2000);

  }
}
