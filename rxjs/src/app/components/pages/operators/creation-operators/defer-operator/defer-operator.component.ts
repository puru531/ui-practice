import { Component, OnInit } from '@angular/core';
import { defer, of } from 'rxjs';

@Component({
  selector: 'app-defer-operator',
  templateUrl: './defer-operator.component.html',
  styleUrls: ['./defer-operator.component.css']
})
export class DeferOperatorComponent implements OnInit{
  ngOnInit(): void {
      
    let source$ = defer(() : any => {
      if(Math.random() > 0.5) {
        return of(1,2,3,4,5);
      } else {
        return of('a', 'b', 'c', 'd', 'e', 'f');
      }
    });

    source$.subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
