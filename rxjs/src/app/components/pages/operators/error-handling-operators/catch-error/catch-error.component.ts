import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-catch-error',
  templateUrl: './catch-error.component.html',
  styleUrls: ['./catch-error.component.css']
})
export class CatchErrorComponent implements OnInit {
  ngOnInit(): void {
      const source$ = new Observable((observer) => {
        observer.next('a');
        observer.next('b');
        observer.error('Something went wrong');
      });

      source$.subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err); // If an error occured, 
      }, () => {
        console.log('Completed');
      });

      //Using catchError, we can send another observable if we encounter error in source observable.
      //This will subscriber will not know thta an error had occured in observable.
      source$
      .pipe(catchError((error, caught) => {
        return of(1,2,3,4) //error occured but returned another observable.
        // throw 'What is this error'; //or we can throw an error, but complwtw will not come.
        // return caught; //if we return this, it will keep on calling source observable again and again.
      })
      )
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err); 
      }, () => {
        console.log('Completed'); //Now this we executed.
      });
  }
}
