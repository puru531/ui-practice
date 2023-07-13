import { Component, OnInit } from '@angular/core';
import { of, single } from 'rxjs';

@Component({
  selector: 'app-single-operator',
  templateUrl: './single-operator.component.html',
  styleUrls: ['./single-operator.component.css']
})
export class SingleOperatorComponent implements OnInit {
  // A function that returns an Observable that emits the single item emitted by the source Observable that matches the predicate.

  //if source Observable emits more than one value than single operator will throw an error. --> SequenceError
  //If no value is emitted the it will throw NotFoundError.
  ngOnInit(): void {
      of(1, 2).pipe(single((val) => val % 2 === 0)).subscribe(data => {
        console.log(data); // two value emitted but in predicate function, it is getting 1 by filtering out;
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      });
      of(1, 2, 3, 4).pipe(single((val) => val % 2 === 0)).subscribe(data => {
        console.log(data); // here more than 1 values are emitted so it will throw error
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      });
      of(1, 2, 3, 4).pipe(single((val) => val % 5 === 0)).subscribe(data => {
        console.log(data); // here no values are emitted so it will throw NotFoundError.
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      });
  }
}
