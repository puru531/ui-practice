import { Component } from '@angular/core';
import { funcObservable, functionObs } from 'src/app/services/Function';

@Component({
  selector: 'app-functions-observable',
  templateUrl: './functions-observable.component.html',
  styleUrls: ['./functions-observable.component.css']
})
export class FunctionsObservableComponent {
  constructor() {
    console.log("Before function call");
    console.log(functionObs());
    console.log(functionObs());
    console.log("After function call");


    console.log("Before ovservable call");
    funcObservable.subscribe(data => {
      console.log(data);
    })
    funcObservable.subscribe(data => {
      console.log(data);
    })
    console.log("After observable call");
  }

}
