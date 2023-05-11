import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-observable',
  templateUrl: './new-observable.component.html',
  styleUrls: ['./new-observable.component.css'],
})
export class NewObservableComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {
    const newObservable = new Observable<number>((observer) => {  //Observable returning number type
      for (let i = 0; i <= 5; i++) {
        if(i === 4) {
          observer.error("Custom error at 4");
        }

        observer.next(i); //send to observer
      }
      observer.complete(); //after sending data, complete it
    });

    //Different ways of subscribing the observable
    //1
    newObservable.subscribe({
      next: (data: number) => console.log('Observer 1 : '+ data),
      error: (err: string) => console.log(err),
      complete: () => console.log('Completed')
    });

    //2
    const observer = {
      next: (data: number) => console.log('Observer 2 : '+ data),
      error: (err: string) => console.log(err),
      complete: () => console.log('Completed')
    }

    newObservable.subscribe(observer);

    //3
    newObservable.subscribe((data) => console.log('Observer type 3 : ' + data), (err) => console.log(err), () => console.log('Completedd'));
  }
}
