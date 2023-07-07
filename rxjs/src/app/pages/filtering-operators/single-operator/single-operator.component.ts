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
  //If no value is emitted the it will throw undefined.
  ngOnInit(): void {
      of(1, 2).pipe(single()).subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      });
  }
}
