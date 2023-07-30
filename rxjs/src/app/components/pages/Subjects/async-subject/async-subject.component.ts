import { Component, OnInit } from '@angular/core';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.css']
})
export class AsyncSubjectComponent implements OnInit {
  ngOnInit(): void {
      let asyncSubject$ = new AsyncSubject();

      asyncSubject$.subscribe(data => {
        console.log('observer 1 ', data);
      }, err => {
        console.log('observer 1 ', err);
      });

      asyncSubject$.next(1);
      asyncSubject$.next(2);
      asyncSubject$.next(3);
       //Until and unless the observable is completed, the subscriber will not emit the value.
       asyncSubject$.complete(); //Now both observable will emit the last emitted value.
      //if last emitted value is error, the subscriber will also emit the error
      setTimeout(() => { //Even if the observable is completed, this subscription will emit the last emitted value because AsyncSubject stores the last emitted value.
        asyncSubject$.subscribe(data => {
          console.log('observer 2 ', data);
        }, err => {
          console.log('observer 2 ', err);
        });
      }, 3000);

     
  }
}
