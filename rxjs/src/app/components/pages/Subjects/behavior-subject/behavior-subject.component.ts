import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.css']
})
export class BehaviorSubjectComponent implements OnInit{
  ngOnInit(): void {
   
    //creating a new Subject
    let subject$ = new Subject();
    //without emitting the data, I'm subscibing to it. --> will not give anything until data is emitted from observable.
    subject$.subscribe(data => {
      console.log('==== Subject : without emit data =', data);
    }, err => {
      console.log('==== Subject : without emit error =', err);
    }, () => {
      console.log('==== Subject : without emit complete');
    });

    //Now emitting the data, as soon as it emits, observable above will get data and print.
    subject$.next("Emitted new data");

    //Subscribing after data emitted. --> It will not get any data because data has been already emitted.
    subject$.subscribe(data => {
      console.log('==== Subject : after emit data = ', data);
    }, err => {
      console.log('==== Subject : after emit error = ', err);
    }, () => {
      console.log('==== Subject : after emit complete');
    });

    subject$.next('Subject : Will be available for both subscribers');



    //BehaviorSubject --> holds default value.
    //creating a new BehaviorSubject
    let behaviorsubject$ = new BehaviorSubject('default');
    //without emitting the data, I'm subscibing to it. --> will give the default data
    behaviorsubject$.subscribe(data => {
      console.log('==== BehaviorSubject : without emit data =', data);
    }, err => {
      console.log('==== BehaviorSubject : without emit error =', err);
    }, () => {
      console.log('==== BehaviorSubject : without emit complete');
    });

    //Now emitting the data, as soon as it emits, observable above will get data and print again.
    behaviorsubject$.next("Emitted new data");

    //Subscribing after data emitted. --> 
    //It will give last emitted value of behaviorSubject.
    behaviorsubject$.subscribe(data => {
      console.log('==== BehaviorSubject : after emit data = ', data);
    }, err => {
      console.log('==== BehaviorSubject : after emit error = ', err);
    }, () => {
      console.log('==== BehaviorSubject : after emit complete');
    });

    //will be emitted by both observers
    behaviorsubject$.next('Will be available for both subscribers');





    // let behaviorSubject$ = new BehaviorSubject(0);

  }

}
