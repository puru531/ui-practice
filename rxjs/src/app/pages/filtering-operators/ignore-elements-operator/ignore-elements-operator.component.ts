import { Component, OnInit } from '@angular/core';
import { ignoreElements, interval, take } from 'rxjs';

@Component({
  selector: 'app-ignore-elements-operator',
  templateUrl: './ignore-elements-operator.component.html',
  styleUrls: ['./ignore-elements-operator.component.css']
})
export class IgnoreElementsOperatorComponent implements OnInit {
  //ingnores all the items emitted by source observable and only passed calls of complete or error.
  ngOnInit(): void {
      interval(1000).pipe(take(5), ignoreElements()).subscribe((data) => {
        console.log(data); // will not be printed to console
      },err => {
        console.log(err); // will be printed in case of error
      }, () => {
        console.log("complete"); // will be printed to console after complete
      });
  }
}
